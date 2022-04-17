fileW = open("convertedTrial.txt", "w")
with open("convertTrial.txt", "r") as scan:
    method = scan.readlines()
    id = "id"
    count = 0
    method = [i.replace(' ', '') for i in method]
    for i in method:
        if i:
            print(i, end='')
        if "id_key" in i:
            print(count)
            count += 1
            fileW.write("\n")
        if "\n" in i:
            i = i[:-1]
        for o in i:
            if o == ",":
                o = ", "
        
        fileW.write(i)
