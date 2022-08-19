
const getPaddedVal = (val) => {
    return val.toString().padStart(2, "0");
}

const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

export const getDateFormatted = (ipDate) => {
    const date = new Date(ipDate);
    return date.toLocaleTimeString('en', { month: 'long', day : "numeric", weekday: "short", year: "numeric",hour12: true   });
}


export const getDateMax = () => {
    const date = new Date();
    return `${date.getFullYear()}-${getPaddedVal(date.getMonth()+1)}-${getPaddedVal(date.getDate())}T${getPaddedVal(date.getHours())}:${getPaddedVal(date.getMinutes())}:${getPaddedVal(date.getSeconds())}`;
}

export const getTimeSince = (date) => {

    const curSeconds = Math.floor((Date.now() - new Date(date).getTime() ) / 1000);
    if(curSeconds <= 1) {
        return "Just Now"
    }
    const interval = intervals.find(i => i.seconds < curSeconds);

    if(intervals) {
        const count = Math.floor(curSeconds / interval.seconds);
        return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    } else {
        return "Just now"
    }
        
    
}