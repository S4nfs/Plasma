from quiz.generator import generate_adaptive_quiz

def cli_demo_menu():
    print("\n==== IntelliEdge RAG CLI ====")
    print("1. Generate Adaptive Quiz")
    print("9. Exit")
    print("=============================")

def cli_main():
    option_letters = ['a', 'b', 'c', 'd']

    while True:
        cli_demo_menu()
        choice = input("Select option: ").strip()

        if choice == "1":
            topic = input("Enter topic: ")
            concept = input("Concept (optional): ").strip() or None
            difficulty = input("Difficulty (easy/medium/hard): ").strip() or "medium"
            num_q = int(input("Number of questions: ").strip() or "5")

            quiz = generate_adaptive_quiz(topic, concept, difficulty, num_q)

            print("\n===== 🧠 Generated Quiz =====")
            for i, q in enumerate(quiz):
                print(f"Q{i+1}: {q['question']}")
                for idx, opt in enumerate(q['options']):
                    print(f"  {option_letters[idx]}. {opt}")
                print("---------------------------------")
        elif choice == "9":
            print("Goodbye.")
            break
        else:
            print("Invalid choice.")
