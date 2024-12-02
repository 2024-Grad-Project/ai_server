import random
import argparse


# 랜덤하게 출력할 값 리스트
values = ['2.33122236', '2.6666']
parser = argparse.ArgumentParser(description ='Hello World program with an argument.')

parser.add_argument('arg', type=int, help ='argument to be added to the Hello, World! message')

args = parser.parse_args()
#print(args)
#print ("Hello, world! {}".format(args.arg))
if args.arg == 1:
    print(2.3312236, end="")
elif args.arg == 0:
    print(1.5345367, end="")


