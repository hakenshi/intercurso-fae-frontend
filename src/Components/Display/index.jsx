import {DisplayMain} from "./DisplayMain";
import {DisplayRoot} from "./DisplayRoot";
import {DisplayActionsRoot} from "./actions/DisplayActionsRoot";
import {DisplayModalButton} from "./actions/DisplayModalButton";
import {DisplaySearch} from "./actions/DisplaySearch";

export const Display = {
    Root: DisplayRoot,
    Main: DisplayMain,
    ActionsSearch: DisplaySearch,
    ActionsRoot: DisplayActionsRoot,
    ActionsModal: DisplayModalButton,
}