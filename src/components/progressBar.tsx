import React from 'react'
import {useIsFetching} from '@tanstack/react-query'
import { useNavigation } from 'react-router'

const ProgressBar = () => {
    const navigation = useNavigation();
    const isFetching = useIsFetching() > 0;

    // Loading ဖြစ်နေမှသာ ဒီ Component ကို ပြမယ်
    if (isFetching || navigation.state !== "idle") {
        return (
            <div className="fixed top-0  left-0 w-full h-1 z-[50]">
                <div className="h-full bg-[#db821d]  animate-progress-bar shadow-[0_0_10px_#db821d]"></div>
            </div>
        );
    }

    // Loading မရှိရင် ဘာမှမပြဘူး (null ပြန်ပေးပါ)
    return null;
}

export default ProgressBar