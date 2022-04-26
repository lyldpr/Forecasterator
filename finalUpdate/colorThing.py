data = [[23, 11, 5, 14],[8, 32, 20, 5]]
color = input()
sumTotal = 0
colorSum = 0
colorList = ["brown", "blue", "green", "black"]
for i in data:
    sumTotal += sum(i)
    for j in i:
        if i.index(j) == colorList.index(color):
            colorSum += j
print(int((colorSum/sumTotal)*100))


def blah():
    blah3 = 3
    return blah3

blah()