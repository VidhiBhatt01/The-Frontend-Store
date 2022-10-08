           # DIGITAL WATCH 

from tkinter import *
from tkinter.ttk import *
from time import strftime
root = Tk()
root.title("Clock")
def time():
    string = strftime('%H:%M:%S %P')
    Label.config(text=string)
    Label.after(1000, time)

    label = Label(root, font=("ds-digital", 80), background="black", foreground="cyan")
    label.pack(anchor='center')
    time()

    mainloop()