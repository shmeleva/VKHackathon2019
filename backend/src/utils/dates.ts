export const dateWithoutHours = (iso8601: string): Date => {
    return new Date(new Date(iso8601).setUTCHours(0, 0, 0, 0));
};