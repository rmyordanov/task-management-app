const Dashboard = () => {
  return (
    <div>
      <h1>DASHBOARD</h1>
      <div class="cards-list">
        <a href="/employees">
          <div class="card 3">
            <div class="card_image">
              <img src="https://media.giphy.com/media/10SvWCbt1ytWCc/giphy.gif" />
            </div>
            <div class="card_title title-white">
              <p>EMPLOYEES</p>
            </div>
          </div>
        </a>

        <a href="/tasks">
          <div class="card 4">
            <div class="card_image">
              <img src="https://media.giphy.com/media/LwIyvaNcnzsD6/giphy.gif" />
            </div>
            <div class="card_title title-white">
              <p>TASKS</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
