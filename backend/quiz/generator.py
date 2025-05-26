import os
import json
from uuid import uuid4
from typing import Optional, List, Dict, Any
from llm.gemini_client import generate_mcq_questions_gemini
from utils.logger import logger


def generate_adaptive_quiz(
    exam: str,
    subject: str,
    topic: str,
    difficulty: str = "medium",
    num_questions: int = 10,
    concept: Optional[str] = None,
    user_id: Optional[str] = None  # ✅ Added
) -> List[Dict[str, Any]]:
    """
    Calls Gemini LLM to generate structured MCQs for NEET PG/UG use cases.
    Logs optional user_id for tracking.
    Returns a list of formatted quiz questions.
    """

    if user_id:
        logger.info(f"🧑‍💻 Generating quiz for user_id: {user_id}")

    try:
        raw_questions = generate_mcq_questions_gemini(
            subject=subject,
            topic=topic,
            concept=concept,
            difficulty=difficulty,
            num_questions=num_questions,
            exam=exam,
            user_id=user_id  # ✅ Optional audit logging
        )
    except Exception as e:
        logger.error(f"❌ Gemini generation failed: {e}")
        return [get_error_question(subject, topic, difficulty)]

    formatted_questions = []
    for q in raw_questions:
        try:
            options_dict = q.get("options", {})
            correct_key = q.get("answer", "").strip().upper()
            correct_answer = options_dict.get(correct_key, "")
            option_values = list(options_dict.values())

            formatted_questions.append({
                "question_id": str(uuid4()),
                "question": q.get("question", ""),
                "options": option_values,
                "answer": correct_answer,
                "explanation": q.get("explanation", "Auto-generated."),
                "difficulty": q.get("difficulty", difficulty),
                "subject": q.get("subject", subject),
                "topic": q.get("topic", topic),
                "exam": exam,
                "concept_tags": [concept or topic]
            })
        except Exception as ex:
            logger.warning(f"⚠️ Malformed question skipped: {ex}")

    if not formatted_questions:
        formatted_questions.append(get_error_question(subject, topic, difficulty, code="EMPTY"))

    save_quiz_to_file(formatted_questions, exam, subject, topic, user_id)
    return formatted_questions


def get_error_question(subject: str, topic: str, difficulty: str, code="ERROR") -> Dict[str, Any]:
    return {
        "question_id": code,
        "question": "Sorry, we could not generate quiz questions at this time.",
        "options": [],
        "answer": "",
        "subject": subject,
        "topic": topic,
        "difficulty": difficulty,
        "exam": "NEET",
        "concept_tags": [topic],
        "explanation": "LLM generation failed or returned no usable data."
    }


def save_quiz_to_file(
    questions: List[Dict[str, Any]],
    exam: str,
    subject: str,
    topic: str,
    user_id: Optional[str] = None  # ✅ For optional tagging
) -> None:
    output_dir = "generated_quizzes"
    os.makedirs(output_dir, exist_ok=True)

    filename_parts = [exam.replace(" ", "_"), subject.replace(" ", "_"), topic.replace(" ", "_")]
    if user_id:
        filename_parts.append(user_id[:8])  # short hash suffix
    filename = "_".join(filename_parts) + "_quiz.json"

    file_path = os.path.join(output_dir, filename)
    try:
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(questions, f, indent=2, ensure_ascii=False)
        logger.info(f"✅ Quiz saved to: {file_path}")
    except Exception as err:
        logger.warning(f"⚠️ Could not write quiz file: {err}")
