import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signin  =() => {
    return <div>
        <div className="grid grid-cols-2">
            <div>
        <Auth type="signin">

        </Auth>
            </div>
            <div className="invisible md:visible">
            <Quote></Quote>
            </div>
    
    </div>
    </div>
}
