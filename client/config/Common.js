exports.getSelectLabelValue = function (value) {
    return value ? { label: value, value: value } : null;
}
exports.getOptionsLabelAsValues = function (options) {
    return options.map(o => { return { label: o, value: o } });
}
exports.getBooks = function ($this) {
    return $this.filteredResults().map((entry, index) => {
        return (
            <div className="card" key={index}>
                <div className="d-flex detail">
                    <div className="icon"><i className="far fa-user"></i></div>
                    <div className="text">{entry.subjectName}</div>
                </div>
                <div className="d-flex detail">
                    <div className="icon"><i className="fas fa-mobile-alt"></i></div>
                    <div className="text">{entry.bookName}</div>
                </div>
                <div className="d-flex detail">
                    <div className="icon"><i className="far fa-envelope-open"></i></div>
                    <div className="text">{entry.authorName}</div>
                </div>
                <div className="d-flex">
                    <div className="detail card-btn left-btn"
                        onClick={() => { $this.props.editPopup('book', entry) }}>Edit</div>
                    <div className="detail card-btn right-btn"
                        onClick={() => { $this.deleteEntry(entry._id) }}>Del</div>
                </div>
            </div>
        );
    });
}
exports.getUsers = function ($this) {
    return $this.filteredResults().map((entry, index) => {
        return (
            <div className="card" key={index}>
                <div className="d-flex detail">
                    <div className="icon"><i className="far fa-user"></i></div>
                    <div className="text">{entry.name} <small>({entry.rollNo})</small></div>
                </div>
                <div className="d-flex detail">
                    <div className="icon"><i className="fas fa-mobile-alt"></i></div>
                    <div className="text">{entry.phone}</div>
                </div>
                <div className="d-flex detail">
                    <div className="icon"><i className="far fa-envelope-open"></i></div>
                    <div className="text">{entry.email}</div>
                </div>
                <div className="d-flex detail">
                    <div className="icon"><i className="far fa-envelope-open"></i></div>
                    <div className="text">{entry.year}</div>
                </div>
                <div className="d-flex detail">
                    <div className="icon"><i className="far fa-envelope-open"></i></div>
                    <div className="text">{entry.campus}</div>
                </div>
                <div className="d-flex detail">
                    <div className="icon"><i className="far fa-envelope-open"></i></div>
                    <div className="text">{entry.stayType}</div>
                </div>
                <div className="d-flex">
                    <div className="detail card-btn left-btn"
                        onClick={() => { $this.props.editPopup('user', entry) }}>Edit</div>
                    <div className="detail card-btn right-btn"
                        onClick={() => { $this.deleteEntry(entry._id) }}>Del</div>
                </div>
            </div>
        );
    })
}