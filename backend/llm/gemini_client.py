import requests
import json
from config import GEMINI_API_KEY
from utils.logger import logger


def generate_mcq_questions_gemini(
    subject: str,
    topic: str,
    num_questions: int,
    difficulty: str,
    concept: str = None,
    exam: str = "NEET PG",
    user_id: str = None  # ✅ NEW for tracking
):
    """
    Sends a prompt to Gemini API to generate clinical or academic MCQs
    based on subject, topic, difficulty, and optional concept.
    Logs the user_id for analytics or tracking.
    """

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
    headers = {
        "Content-Type": "application/json"
    }

    # Optional concept clarification
    concept_text = f" (concept: {concept})" if concept else ""

    # Prompt text for Gemini
    prompt_text = (
        f"You are a top educator and domain expert preparing {exam} aspirants. "
        f"Generate {num_questions} high-quality multiple-choice questions (MCQs) "
        f"for the subject \"{subject}\" under the topic \"{topic}\" at a \"{difficulty}\" level{concept_text}.\n\n"

        "Each MCQ must be returned as a raw JSON object with the following fields:\n"
        "- 'question': A clear NEET-style MCQ (clinical or conceptual)\n"
        "- 'options': A dictionary with exactly four labeled options: A, B, C, D\n"
        "- 'answer': The correct option key (e.g., 'A')\n"
        "- 'explanation': A concise justification (1–2 lines)\n"
        "- 'subject', 'topic', and 'difficulty'\n\n"

        "Respond with ONLY a JSON array of such objects. No markdown, no commentary, no code blocks.\n\n"

        "Example:\n"
        "[\n"
        "  {\n"
        "    \"question\": \"Which of the following is the most common cause of community-acquired pneumonia in adults?\",\n"
        "    \"options\": {\n"
        "      \"A\": \"Staphylococcus aureus\",\n"
        "      \"B\": \"Streptococcus pneumoniae\",\n"
        "      \"C\": \"Klebsiella pneumoniae\",\n"
        "      \"D\": \"Pseudomonas aeruginosa\"\n"
        "    },\n"
        "    \"answer\": \"B\",\n"
        "    \"explanation\": \"Streptococcus pneumoniae is the leading cause of CAP in immunocompetent adults.\",\n"
        "    \"subject\": \"Medicine\",\n"
        "    \"topic\": \"Respiratory Infections\",\n"
        "    \"difficulty\": \"medium\"\n"
        "  }\n"
        "]"
    )

    payload = {
        "contents": [
            {
                "parts": [{"text": prompt_text}]
            }
        ]
    }

    if user_id:
        logger.info(f"👤 Gemini request initiated by user_id: {user_id}")

    logger.info(f"🧠 Sending {exam} MCQ prompt to Gemini for {subject} > {topic}...")

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()

        raw_text = response.json()['candidates'][0]['content']['parts'][0]['text']
        start, end = raw_text.find("["), raw_text.rfind("]") + 1
        if start != -1 and end != -1:
            json_block = raw_text[start:end]
            questions = json.loads(json_block)
            logger.info(f"✅ Received {len(questions)} questions from Gemini.")
            return questions
        else:
            raise ValueError("❌ No JSON array found in Gemini response.")

    except Exception as e:
        logger.error(f"❌ Gemini parsing failed: {e}")
        raise
