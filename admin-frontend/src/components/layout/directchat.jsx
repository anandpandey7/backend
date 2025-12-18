const DirectChat = () => {
  return (
    <div className="card direct-chat direct-chat-primary mb-4">
      {/* Header */}
      <div className="card-header">
        <h3 className="card-title">Direct Chat</h3>

        <div className="card-tools">
          <span className="badge text-bg-primary">3</span>

          <button className="btn btn-tool">
            <i className="bi bi-plus-lg"></i>
          </button>

          <button className="btn btn-tool">
            <i className="bi bi-chat-text-fill"></i>
          </button>

          <button className="btn btn-tool">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        {/* Messages */}
        <div className="direct-chat-messages">
          {/* Message Start */}
          <div className="direct-chat-msg">
            <div className="direct-chat-infos clearfix">
              <span className="direct-chat-name float-start">
                Alexander Pierce
              </span>
              <span className="direct-chat-timestamp float-end">
                23 Jan 2:00 pm
              </span>
            </div>

            <img
              className="direct-chat-img"
              src="/assets/img/user1-128x128.jpg"
              alt="user"
            />

            <div className="direct-chat-text">
              Is this template really for free? That's unbelievable!
            </div>
          </div>

          {/* Message End */}
          <div className="direct-chat-msg end">
            <div className="direct-chat-infos clearfix">
              <span className="direct-chat-name float-end">
                Sarah Bullock
              </span>
              <span className="direct-chat-timestamp float-start">
                23 Jan 2:05 pm
              </span>
            </div>

            <img
              className="direct-chat-img"
              src="/assets/img/user3-128x128.jpg"
              alt="user"
            />

            <div className="direct-chat-text">
              You better believe it!
            </div>
          </div>
        </div>

        {/* Contacts */}
        <div className="direct-chat-contacts">
          <ul className="contacts-list">
            <li>
              <a href="#">
                <img
                  className="contacts-list-img"
                  src="/assets/img/user1-128x128.jpg"
                  alt="user"
                />
                <div className="contacts-list-info">
                  <span className="contacts-list-name">
                    Count Dracula
                    <small className="contacts-list-date float-end">
                      2/28/2023
                    </small>
                  </span>
                  <span className="contacts-list-msg">
                    How have you been? I was...
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type Message ..."
          />
          <button className="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  );
};

export default DirectChat;
