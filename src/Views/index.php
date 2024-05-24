<?php $title = 'Home'; include('partials/header-with-calendar.php') ?>

<main>
  <div class="wrapper">
    <div class="calendar-header">
      <h2 class="calendar-header__title">Calendar</h2>
      <ul class="calendar-header__filtr">
        <li class="calendar-header__filtr-item pink-secondary-bg" id="meeting_with_an_expert">Meeting with an expert</li>
        <li class="calendar-header__filtr-item green-secondary-bg" id="question_answer">Question-answer</li>
        <li class="calendar-header__filtr-item yellow-secondary-bg" id="conference">Conference</li>
        <li class="calendar-header__filtr-item blue-secondary-bg" id="webinar">Webinar</li>
      </ul>
    </div>
    <div id="calendar"></div>
  </div>
</main>

<?php include('partials/footer.php') ?>
