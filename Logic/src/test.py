from main import app
import os
import requests
import json
from api_helper import get_weather_by_location
import jwt

TEST_QUERY = '''query MyQuery {
  closet(where: {}) {
    color
    clothes_id
    is_upper
    season
    state
    user_id
  }
}
'''

@app.get("/hasura_test")
async def hasura_test():
    hasura_endpoint = "https://fmowl.narumir.io/v1/graphql"
    hasuraSecret = os.environ["HASURA_SECRET"]
    headers = { "content-type": "application/json", "x-hasura-admin-secret": hasuraSecret }
    json_param = { "query": TEST_QUERY }
    res_str = requests.post(hasura_endpoint, headers=headers, json=json_param)
    res_json = json.loads(res_str.text)

    return res_json

@app.get("/weather_test")
async def weather_test():
    res_str = ""
    if True:
      serviceKey = os.environ["WEATHER_SECRET"]
      pageNo = "1"
      numOfRows = "10"
      dataType = "JSON"
      baseDate = "20231113"
      baseTime = "0500"    # 5시
      nx = "55"
      ny = "127"
      url1 = f"http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey={serviceKey}&pageNo={pageNo}&numOfRows={numOfRows}&dataType={dataType}&base_date={baseDate}&base_time={baseTime}&nx={nx}&ny={ny}"
      res_str = requests.get(url=url1)
    else: 
      params = {
          "serviceKey": os.environ["WEATHER_SECRET"], 
          "pageNo": "1", 
          "numOfRows": "10",
          "dataType": "JSON", 
          "base_date" : "20231210", 
          "base_time": "1700", 
          "nx": "60", 
          "ny": "120"
        }
      url2 = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst"
      res_str = requests.get(url=url2, params=params)

    res_json = json.loads(res_str.text)

    return res_json

@app.get("/weather_test2")
async def weather_test2(): 
    print("weather_test2", end="\n")
    weather = get_weather_by_location("seoul")

    return { "weather": weather.name }

