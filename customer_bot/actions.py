# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/core/actions/#custom-actions/


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

products = {
    "Crocin": "Bandra Medical Store - 1 Ether",
    "Abilify": "Bandra Medical Store - 2 Ether",
    "Aspirin": "Bandra Medical Store - 3 Ether",
    "Onpattro": "Bandra Medical Store - 1 Ether",
    "Entyvio": "Bandra Medical Store - 2 Ether",
    "Naproxen": "Bandra Medical Store - 3 Ether",
    "Humira": "Bandra Medical Store - 1 Ether",
    "Januvia": "Bandra Medical Store - 2 Ether",
}


class ActionFindProduct(Action):
    def name(self) -> Text:
        return "action_find_product"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        product = tracker.get_slot("product")
        if product is None or products[product] is None:
            msg = "Sorry no such drug found"
        else:
            msg = "Drug: {} found at {}".format(product, products[product])

        dispatcher.utter_message(text=msg)

        return []
