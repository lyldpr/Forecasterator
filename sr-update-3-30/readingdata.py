fileW = open("C:/Users/jaxso/Desktop/testing.txt", "w")
with open("C:/Users/jaxso/Desktop/ForecasteratorData", "r") as scan:
    method = scan.readlines()
    id = "id"
    count = 0
    method = [i.replace(' ', '') for i in method]
    for i in method:
        if i:
            print(i, end='')
        if "id" in i:
            print(count)
            count += 1
            fileW.write("\n\n\n")
        if "\n" in i and "id" not in i:
            i = i[:-1]
        if "prices_list" in i:
            fileW.write("\n")
        for o in i:
            if o == ",":
                o = ", "
        
        fileW.write(i)
