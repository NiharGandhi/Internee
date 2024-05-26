import Header from "@/components/header";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div className="flex justify-center items-center py-6">
                <SignUp />
            </div>
        </div>
);
}