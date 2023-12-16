from fastapi import FastAPI
import requests
import os
import json
import jwt
from data_model import RecommandRequest
from fastapi import FastAPI, HTTPException
from jwt.exceptions import InvalidTokenError
from api_helper import get_weather_by_location, get_user_closet, g_color_match_map, UpperCloth, LowerCloth, MatchedClothes
from typing import List
import random
from starlette.middleware.cors import CORSMiddleware

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALOG = os.getenv("JWT_ALOG")

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return { "msg": "logic_root" }

@app.post("/recommand")
async def recommand(request: RecommandRequest):
    key = "test_key"
    algo = "HS256"
    if False:
        key = JWT_SECRET
        algo = JWT_ALOG


    try:
        decoded = jwt.decode(request.token, key=key, algorithms=algo)

        location = decoded["location"]
        claims = decoded["https://hasura.io/jwt/claims"]
        user_id = claims["x-hasura-user-id"]

        weather = get_weather_by_location(location)
        print("weather:" + weather.name, end="\n")
        closet = get_user_closet(user_id, weather)

        upper_clothes : List[UpperCloth] = []
        lower_clothes : List[LowerCloth] = []

        for cloth in closet: 
            if cloth["is_upper"]:
                upper = UpperCloth(cloth["clothes_id"], cloth["color"])
                upper_clothes.append(upper)
            else:
                lower = LowerCloth(cloth["clothes_id"], cloth["color"])
                lower_clothes.append(lower)

        matched_clothes_list : List[MatchedClothes] = []
        for upper in upper_clothes:
            lower_map = g_color_match_map[upper.color]
            for lower in lower_clothes:
                if lower.color in lower_map:
                    matched_clothes_list.append(MatchedClothes(upper, lower))
        
        if len(matched_clothes_list) == 0:
            return HTTPException(status_code=404, detail="no match found")
        else:   # select random from matched list
            selected = random.choice(matched_clothes_list)
            
            return { "upper_id": selected.upper.id, "lower_id":selected.lower.id }

    except InvalidTokenError: 
        raise HTTPException(status_code=400, detail="Invalid Token")
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Invalid Key: {e}")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=f"Exception: {e}")

@app.get("/json_test")
async def json_test():
    key = "test_key"

    location = "SEOUL"
    user_id = "c025f706-820e-11ee-b962-0242ac120002"

    jwt_payload = {
        "location": location,
        "https://hasura.io/jwt/claims": {
            "x-hasura-default-role": "user",
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-user-id": user_id,
        },
    }

    encoded = jwt.encode(
        jwt_payload,
        key=key,
        algorithm="HS256",
    )
    decoded = jwt.decode(encoded, key=key, algorithms="HS256")

    return { "payload: ": jwt_payload, "encoded": encoded, "decoded": decoded }