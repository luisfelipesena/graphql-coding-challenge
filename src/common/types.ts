export type ApiResponse<T> = {
	success: boolean;
	message: string;
	error?: Error;
	data?: T;
};
