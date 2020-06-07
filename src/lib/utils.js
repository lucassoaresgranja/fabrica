module.exports = {
    age(timestamp){
        const today = new Date();
        const birthDate = new Date(timestamp);
    
        // 2019 - 1984 = 35
        let age = today.getUTCFullYear() - birthDate.getUTCFullYear();
        const month = today.getUTCMonth() - birthDate.getUTCMonth();
        
                // 11 - 12 = -1
                // 11 - 11 = 0                   // 11 - 10 = 1
        if (month < 0 || 
            month == 0 && 
            today.getDate() < birthDate.getDate()) {
            age = age - 1
        }

        return age
    
    },

    date(timestamp){
        const date = new Date(timestamp);
        
        // yyyy
        const year = date.getUTCFullYear();

        // mm
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);

        // dd
        const day = `0${date.getUTCDate()}`.slice(-2);

        // return yyy--mm--dd
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`, // iso 
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`,
        }
        
        
     

    }
}