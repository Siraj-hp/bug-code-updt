export interface Challenge {
  id: number
  title: string
  language: "python"
  description: string
  buggyCode: string
  errors: {
    id: number
    description: string
    solution: string
  }[]
  expectedOutput: string
}

// Filter to only include 5 Python challenges
export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Fix the List Sum Function",
    language: "python",
    description:
      "This function should calculate the sum of all numbers in a list, but it has 5 bugs. Fix the code to correctly sum all elements in the list.",
    buggyCode: `def calculate_sum(numbers):
    total = 1  # Bug 1: Should initialize to 0
    for i in range(len(numbers) + 1):  # Bug 2: Range is too large
        totl += numbers[i]  # Bug 3: Variable name typo
    return totl  # Bug 4: Variable name typo
    print("Sum calculated")  # Bug 5: Unreachable code after return

# Test case
numbers = [10, 20, 30, 40, 50]
print(f"Sum: {calculate_sum(numbers)}")`,
    errors: [
      {
        id: 1,
        description: "Incorrect initialization value",
        solution: "total = 0",
      },
      {
        id: 2,
        description: "Incorrect range causing index error",
        solution: "for i in range(len(numbers))",
      },
      {
        id: 3,
        description: "Variable name typo in loop",
        solution: "total += numbers[i]",
      },
      {
        id: 4,
        description: "Variable name typo in return",
        solution: "return total",
      },
      {
        id: 5,
        description: "Unreachable code after return",
        solution: "# Move print before return or remove it",
      },
    ],
    expectedOutput: "Sum: 150",
  },
  {
    id: 2,
    title: "Fix the Factorial Function",
    language: "python",
    description:
      "This recursive factorial function has 5 bugs. Fix it to correctly calculate the factorial of a number n (n!).",
    buggyCode: `def factorial(n)
    if n == 0:
        return 0  # Bug 1: Should return 1 for base case
    elif n < 0:  # Bug 2: Should check if n < 0 before base case
        return "Error: n must be non-negative"
    else
        return n * factorial(n+1)  # Bug 3: Should be n-1, not n+1
    
# Bug 4: Missing test case
# Bug 5: Missing print statement

`,
    errors: [
      {
        id: 1,
        description: "Missing colon after function definition",
        solution: "def factorial(n):",
      },
      {
        id: 2,
        description: "Incorrect base case return value",
        solution: "return 1  # Base case",
      },
      {
        id: 3,
        description: "Missing colon after else",
        solution: "else:",
      },
      {
        id: 4,
        description: "Incorrect recursive call",
        solution: "return n * factorial(n-1)",
      },
      {
        id: 5,
        description: "Missing test case and print statement",
        solution: 'print(f"Factorial of 5: {factorial(5)}")',
      },
    ],
    expectedOutput: "Factorial of 5: 120",
  },
  {
    id: 3,
    title: "Fix the Prime Number Checker",
    language: "python",
    description:
      "This function should check if a number is prime, but it has 5 logical errors. Fix the code to correctly identify prime numbers.",
    buggyCode: `def is_prime(num):
    if num < 2:
        return True  # Bug 1: Numbers less than 2 are not prime
    
    for i in range(2, num):  # Bug 2: Inefficient range
        if num / i == 0:  # Bug 3: Should use modulo (%), not division
            return False
    
    return False  # Bug 4: Should return True if no divisors found
    
# Bug 5: Missing test cases

`,
    errors: [
      {
        id: 1,
        description: "Incorrect return for numbers less than 2",
        solution: "return False  # Numbers less than 2 are not prime",
      },
      {
        id: 2,
        description: "Inefficient range check",
        solution: "for i in range(2, int(num**0.5) + 1):  # Only need to check up to square root",
      },
      {
        id: 3,
        description: "Incorrect division operator",
        solution: "if num % i == 0:  # Use modulo to check for divisibility",
      },
      {
        id: 4,
        description: "Incorrect return value at end",
        solution: "return True  # If no divisors found, number is prime",
      },
      {
        id: 5,
        description: "Missing test cases",
        solution:
          '# Test cases\ntest_numbers = [0, 1, 2, 3, 4, 5, 9, 11]\nfor num in test_numbers:\n    print(f"{num} is prime: {is_prime(num)}")',
      },
    ],
    expectedOutput:
      "0 is prime: False\n1 is prime: False\n2 is prime: True\n3 is prime: True\n4 is prime: False\n5 is prime: True\n9 is prime: False\n11 is prime: True",
  },
  {
    id: 4,
    title: "Fix the Palindrome Checker",
    language: "python",
    description:
      "This function should check if a string is a palindrome (reads the same forwards and backwards), but it has 5 bugs. Fix the code to correctly identify palindromes.",
    buggyCode: `def is_palindrome(text)
    # Bug 1: Missing colon after function definition
    text = text.lower()  # Convert to lowercase
    
    # Bug 2: No handling for spaces or punctuation
    
    # Bug 3: Incorrect comparison logic
    for i in range(len(text) // 2):
        if text[i] != text[len(text) - i]:  # Bug 4: Index error
            return False
    
    # Bug 5: Missing return statement for True case

# Test cases
test_strings = ["racecar", "Hello", "A man a plan a canal Panama"]
for s in test_strings:
    print(f"'{s}' is a palindrome: {is_palindrome(s)}")`,
    errors: [
      {
        id: 1,
        description: "Missing colon after function definition",
        solution: "def is_palindrome(text):",
      },
      {
        id: 2,
        description: "No handling for spaces or punctuation",
        solution: 'text = "".join(c for c in text.lower() if c.isalnum())  # Remove non-alphanumeric chars',
      },
      {
        id: 3,
        description: "Incorrect comparison logic",
        solution: "# Could also use: return text == text[::-1]",
      },
      {
        id: 4,
        description: "Index error in comparison",
        solution: "if text[i] != text[len(text) - 1 - i]:  # Fix index calculation",
      },
      {
        id: 5,
        description: "Missing return statement for True case",
        solution: "return True  # If we get through the loop, it's a palindrome",
      },
    ],
    expectedOutput:
      "'racecar' is a palindrome: True\n'Hello' is a palindrome: False\n'A man a plan a canal Panama' is a palindrome: True",
  },
  {
    id: 5,
    title: "Fix the List Duplicates Remover",
    language: "python",
    description:
      "This function should remove duplicates from a list while preserving the original order, but it has 5 bugs. Fix the code to correctly remove duplicates.",
    buggyCode: `def remove_duplicates(items)
    # Bug 1: Missing colon after function definition
    result = []
    seen = {}  # Bug 2: Should use a set, not a dict
    
    for item in items
        # Bug 3: Missing colon after for loop
        if item in seen:  # Bug 4: Incorrect condition
            continue
        seen[item] = True
        result.append(item)
    
    # Bug 5: Missing return statement

# Test cases
test_lists = [
    [1, 2, 3, 1, 2, 5, 6, 7, 8],
    ["apple", "banana", "apple", "orange", "banana", "grape"]
]

for lst in test_lists:
    print(f"Original: {lst}")
    print(f"Without duplicates: {remove_duplicates(lst)}")`,
    errors: [
      {
        id: 1,
        description: "Missing colon after function definition",
        solution: "def remove_duplicates(items):",
      },
      {
        id: 2,
        description: "Using dict instead of set",
        solution: "seen = set()  # Use a set for O(1) lookups",
      },
      {
        id: 3,
        description: "Missing colon after for loop",
        solution: "for item in items:",
      },
      {
        id: 4,
        description: "Incorrect condition for checking duplicates",
        solution: "if item in seen:  # This is correct, but the data structure was wrong",
      },
      {
        id: 5,
        description: "Missing return statement",
        solution: "return result  # Return the list without duplicates",
      },
    ],
    expectedOutput:
      "Original: [1, 2, 3, 1, 2, 5, 6, 7, 8]\nWithout duplicates: [1, 2, 3, 5, 6, 7, 8]\nOriginal: ['apple', 'banana', 'apple', 'orange', 'banana', 'grape']\nWithout duplicates: ['apple', 'banana', 'orange', 'grape']",
  },
]
