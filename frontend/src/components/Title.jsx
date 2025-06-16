import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | BlueStock IPO App`
    }, [title])

};

export default useTitle;
