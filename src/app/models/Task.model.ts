import { Place } from "../enums/place.enum";
import { WorkTypes } from "../enums/work-types.enum";
import { Work } from "../enums/work.enum";

export interface Task {
    id?: number;
    title: string;
    duration: number;
    date: Date;
    work?: Work | null,
    workType?: WorkTypes | null,
    place?: Place | null,
    description?: string | null,
    issuedTKPTask?: string | null
}