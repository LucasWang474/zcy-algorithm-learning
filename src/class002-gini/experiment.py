# Sources:
# - https://github.com/algorithmzuo/algorithm-journey/blob/main/src/class002/Experiment.java
# - https://www.bilibili.com/video/BV1Q14y1B7DH

# 一开始有100个人，每个人都有100元
# 在每一轮都做如下的事情 :
# 每个人都必须拿出1元钱给除自己以外的其他人，给谁完全随机
# 如果某个人在这一轮的钱数为0，那么他可以不给，但是可以接收
# 发生很多很多轮之后，这100人的社会财富分布很均匀吗？


import argparse
import random
from typing import List


def calc_gini(wealth_list: List[int]) -> float:
    total_wealth = sum(wealth_list)

    total_difference_of_wealth = sum(
        abs(w1 - w2) for w1 in wealth_list for w2 in wealth_list
    )

    return total_difference_of_wealth / (2 * len(wealth_list) * total_wealth)


def get_random_other_index(cur: int, size: int) -> int:
    res = random.randrange(0, size)
    if res == cur:
        return (res + 1) % size
    return res


def run_single_round(wealth_list: List[int]) -> List[int]:
    size = len(wealth_list)
    for i, wealth in enumerate(wealth_list):
        if wealth < 0:
            raise ValueError(f"wealth must be non negative, {wealth}, i: {i}")
        if not wealth:
            continue

        random_idx = get_random_other_index(i, size)

        wealth_list[random_idx] += 1
        wealth_list[i] -= 1
    return wealth_list


INITIAL_WEALTH = 100
DEFAULT_POPULATION_SIZE = 100
DEFAULT_ROUNDS = 1000


def run_experiment(*, size: int, times: int, initial_wealth=INITIAL_WEALTH) -> None:
    print(f"size: {size}, times: {times}")

    wealth_list = [initial_wealth] * size
    gini_start = calc_gini(wealth_list)
    for _ in range(times):
        wealth_list = run_single_round(wealth_list)
    gini_end = calc_gini(wealth_list)
    print(f"gini_start: {gini_start}, gini_end: {gini_end}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--size", type=int, default=DEFAULT_POPULATION_SIZE, help="人口数量"
    )
    parser.add_argument("--times", type=int, default=DEFAULT_ROUNDS, help="轮数")

    args = parser.parse_args()
    size = args.size
    times = args.times

    print(
        """一个社会的基尼系数是一个在 0~1 之间的小数
    基尼系数为0代表所有人的财富完全一样
    基尼系数为1代表有1个人掌握了全社会的财富
    基尼系数越小，代表社会财富分布越均衡；越大则代表财富分布越不均衡
    在2022年，世界各国的平均基尼系数为 0.44
    目前普遍认为，当基尼系数到达 0.5 时
    就意味着社会贫富差距非常大，分布非常不均匀
    社会可能会因此陷入危机，比如大量的犯罪或者经历社会动荡"""
    )

    print(f"times: {times}")
    print(f"size: {size}")

    run_experiment(size=size, times=times)


if __name__ == "__main__":
    main()
