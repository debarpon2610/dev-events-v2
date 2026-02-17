import DateTimePicker from "@/components/specific client components/dateTimePicker"
import RevealBtn from "@/components/specific client components/revealBtn";



const TestPage = () => {
    
    return (
        <div className="test-template">
            <h1 className="mb-4 pb-3">Test Page</h1>
            <DateTimePicker />
            <RevealBtn></RevealBtn>
        </div>
    )
}

export default TestPage