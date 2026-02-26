import { CgSpinner } from "react-icons/cg";

export default function Loading() {
    return (
        <div className="height-minus-footer flex justify-center items-center">
            <CgSpinner className="size-12 animate-spin" />
        </div>
    )
}