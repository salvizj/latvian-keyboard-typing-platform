export enum Finger {
	Pinky = "pinky",
	Ring = "ring",
	Middle = "middle",
	Index = "index",
	Thumb = "thumb",
}

export enum Hand {
	Left = "left",
	Right = "right",
}
export type KeyObj = {
	key: string
	label: string
	size: string
	hand?: Hand
	finger?: Finger
	altKey?: string
	altLabel?: string
}
