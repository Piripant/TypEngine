import glob
import os

built_file = ""

for file_name in glob.glob("*.ts"):
    file = open(file_name, "r").read()
    built_file += file + "\n"

directory = ".\Build"
if not os.path.exists(directory):
    os.makedirs(directory)

file = open(directory + "\TypEngine.ts", "w")
file.write(built_file)

print("Done!")
