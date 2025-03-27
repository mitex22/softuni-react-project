export const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
}