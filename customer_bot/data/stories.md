## greet + order product = successful

* greet
  - utter_greet
* order_product
  - utter_searching
  - action_find_product
  - utter_did_that_help
* affirm OR thanks
  - utter_happy

## greet + order product = fail

* greet
  - utter_greet
* order_product
  - utter_searching
  - action_find_product
  - utter_did_that_help
* deny
  - utter_goodbye

## say goodbye

* goodbye
  - utter_goodbye

## bot challenge

* bot_challenge
  - utter_iamabot
