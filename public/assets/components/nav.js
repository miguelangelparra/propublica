Vue.component('my-nav', {
  template:
    `
  <nav class="navbar navbar-expand bg-dark navbar-dark sticky-top">
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="index.html">Home</a></li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" data-toggle="dropdown">Congress 113</a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="senate-data.html">Senate</a>
        <a class="dropdown-item" href="house-data.html">House</a>
      </div>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" data-toggle="dropdown">Attendance</a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="attendance-senate.html">Senate</a>
        <a class="dropdown-item" href="attendance-house.html">House</a>
      </div>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" data-toggle="dropdown">Party Loyalty</a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="loyalty-senate.html">Senate</a>
        <a class="dropdown-item" href="loyalty-house.html">House</a>
      </div>
    </li>
  </ul>
</nav>
  `

})