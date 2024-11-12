function TravelReport() {

    const onClickAddReportHandler = () => {
        window.location.href = '/AddReportDate';
    }

    return (
        <div>
            <button  onClick={onClickAddReportHandler} >
                + 후기 추가하기
            </button>

            <p>남의 후기</p>
            <p>남의 후기</p>

        </div>
    )
};

export default TravelReport;