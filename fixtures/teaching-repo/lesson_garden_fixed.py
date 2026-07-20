"""Illustrative corrected copy. It is offered for review/download only."""

def greet(name):
    return "Hi " + name

score = 10
print(score)
print("Welcome")

age = 10
if age > 5:
    print("big kid")

colors = ["red", "blue"]
print(colors[1])

def welcome(name):
    message = "Hi " + name
    return message

for number in [1, 2, 3]:
    print(number)

name = "Maya"
print("Hello, " + name)

message = "Good morning"
print(message)

def average(numbers):
    total = sum(numbers)
    return total / len(numbers)

def is_even(number):
    return number % 2 == 0

def repeat(word, times):
    return word * times

import math
print(math.sqrt(9))

total = 0
for value in values:
    total += value

def safe_divide(a, b):
    if b == 0:
        return None
    return a / b

items = []
active = []
for item in items:
    if item.active:
        active.append(item)

def clean_name(name):
    return name.strip().lower()

def first_item(items):
    if items:
        return items[0]
    return None

def count_down(number):
    while number > 0:
        print(number)
        number -= 1
