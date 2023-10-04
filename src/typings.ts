export interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export enum Filter {
	ID = 'id',
	TITLE = 'title',
	BODY = 'body',
}
