import { useState } from "react";

import zipcelx from "zipcelx/lib/module";

const useZipcelx = () => {
  const [exportData, setExportData] = useState({});

  const generateXlsx = (data) => {
    if (!data.mainDeckCards || data.mainDeckCards.length < 1) return;

    setExportData(data);
    let formattedConfigData = [];

    const generatedConfigFile = (data) => {
      const { mainDeckCards, extraDeckCards } = data;

      // Combine main and extra deck
      let allCards = mainDeckCards.slice();
      allCards.push(...extraDeckCards);

      const determineDeck = (cardType) => {
        const lowerCaseCardType = cardType.toLowerCase();
        if (
          lowerCaseCardType.includes("xyz") ||
          lowerCaseCardType.includes("synchro") ||
          lowerCaseCardType.includes("link") ||
          lowerCaseCardType.includes("fusion")
        ) {
          return "Extra";
        } else {
          return "Main";
        }
      };

      const consolidatedDeckData = allCards.reduce((accum, val) => {
        // Get named card from accum, increase count property by one
        // If card not in accum, create new obj with name, type, count, and deck properties
        let summary =
          accum.get(val.name) ||
          Object.assign(
            {},
            {
              name: val.name,
              type: val.type,
              count: 0,
              deck: determineDeck(val.type),
            }
          );

        summary.count++;
        return accum.set(val.name, summary);

        // Create a new map with data to remove duplicates
      }, new Map());

      // Use created map to create XLSX data
      consolidatedDeckData.forEach((card) => {
        formattedConfigData.push([
          {
            value: card.deck,
            type: "string",
          },
          {
            value: card.type,
            type: "string",
          },
          {
            value: card.name,
            type: "string",
          },
          {
            value: card.count,
            type: "number",
          },
        ]);
      });
    };

    generatedConfigFile(data);

    // Default XLSX layout for exports
    const config = {
      filename: "my-ygo-deck-export",
      sheet: {
        data: [
          [
            {
              value: "Deck",
              type: "string",
            },
            {
              value: "Card Type",
              type: "string",
            },
            {
              value: "Card Name",
              type: "string",
            },
            {
              value: "Copies",
              type: "string",
            },
          ],
          ...formattedConfigData,
        ],
      },
    };

    zipcelx(config);
  };

  return [exportData, generateXlsx];
};

export default useZipcelx;
