import math
import random
from typing import Any

import numpy

ID_CHARACTERS = 'ABCDEFGHKMNPRSTWX23456789'

def generate_random_tid(t: str, n: int = 6) -> str:
    characters = random.choices(ID_CHARACTERS, k=n)
    idcs = ''.join(characters)
    return f"{t}-{idcs}"

def generate_unique_tid(t: str, ids: dict[str, Any]) -> str:
    n_used = numpy.emath.logn(len(ID_CHARACTERS), len(ids))
    n = math.ceil(n_used + 0.1)
    while True:
        id = generate_random_tid(t, n)
        if id not in ids:
            return id
