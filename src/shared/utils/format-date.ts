import dayjs from 'dayjs';

export const formatDate = (date?: Date | string, format: string = 'MMMM DD, YYYY') => {
    return dayjs(date).format(format);
}