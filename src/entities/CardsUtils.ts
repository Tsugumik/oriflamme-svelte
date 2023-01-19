import Ambush from "./Ambush";
import Archer from "./Archer";
import Assasination from "./Assassination";
import Conspiracy from "./Conspiracy";
import Heir from "./Heir";
import Impostor from "./Impostor";
import Knight from "./Knight";
import Lord from "./Lord";
import RoyalDecree from "./RoyalDecree";
import Spy from "./Spy";
import UnknownCard from "./UnknownCard";

export enum CardId {
    AMBUSH,
    ARCHER,
    ASSASSINATION,
    CONSPIRACY,
    HEIR,
    IMPOSTOR,
    KNIGHT,
    LORD,
    ROYALDECREE,
    SPY,
    UNKNOWN
}

export const CardsConstructors = {
    [CardId.AMBUSH]: Ambush,
    [CardId.ARCHER]: Archer,
    [CardId.ASSASSINATION]: Assasination,
    [CardId.CONSPIRACY]: Conspiracy,
    [CardId.HEIR]: Heir,
    [CardId.IMPOSTOR]: Impostor,
    [CardId.KNIGHT]: Knight,
    [CardId.LORD]: Lord,
    [CardId.ROYALDECREE]: RoyalDecree,
    [CardId.SPY]: Spy,
    [CardId.UNKNOWN]: UnknownCard
}

