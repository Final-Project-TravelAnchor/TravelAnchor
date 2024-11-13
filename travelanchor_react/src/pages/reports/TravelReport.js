function TravelReport() {

    const onClickAddReportHandler = () => {
        window.location.href = '/AddReportDate';
    }
    const onClickReport = () => {
        window.location.href = '/Report';
    }
    

    return (
        <div>
            <button  onClick={onClickAddReportHandler} >
                + 후기 추가하기
            </button>

            <button  onClick={onClickReport} >
                후기 내용이 보여질 예정
            </button>

        </div>
    )
};

export default TravelReport;