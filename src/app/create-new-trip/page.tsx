import ChatBox from "@/components/NewTrip/ChatBox";

function CreateNewTripPage() {
    return (
        <div className="grid h-full grid-cols-1 gap-5 overflow-hidden p-10 md:grid-cols-2">
            <ChatBox />

            <div >Map and trip Plan to Display</div>
        </div>
    );
}

export default CreateNewTripPage;