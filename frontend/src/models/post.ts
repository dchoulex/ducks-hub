import { comment } from "./comment";
import { postBase } from "./postBase";

export interface post extends postBase {
    text: string;
    comments: comment[];
}