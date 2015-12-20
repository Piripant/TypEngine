import glob
import os

non_engine_files = ["pixi.js.d.ts"]
exclude_file = ["UserScript.ts"]

built_file = ""
lines_count = 0
char_count = 0

for file_name in glob.glob("*.ts"):
    if file_name not in exclude_file:
        file = open(file_name, "r").read()
        built_file += file + "\n"
        if (file_name not in non_engine_files):
            lines_count += len(file.split("\n"))
            char_count += len(file)

directory = "build"
if not os.path.exists(directory):
    os.makedirs(directory)

file = open(directory + "\TypEngine.ts", "w")
file.write(built_file)

print("Lines of code: " + str(lines_count))
print("Chars of code: " + str(char_count))
print("Done!")
