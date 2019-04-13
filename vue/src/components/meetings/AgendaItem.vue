<template>
  <div class="agenda-item">
    <div class="agenda-icon-tray">
      <i class="far fa-sticky-note active"></i>
      <i class="fas fa-tasks active"></i>
    </div>
    <h2>Fundraising</h2>
    <p contenteditable="true" class="agenda-item-description">We want to fundraise at least $3,000 to fund this project.</p>

    <h3>Notes</h3>
    <p contenteditable="true" class="agenda-item-note">We need to contact different companies who would potentially partner with us to fundraise and then come back with different options.</p>

    <h3>Action Items</h3>
    <div class="agenda-action-items">
      <div class="action-item">
        <input type="checkbox">
        <div class="action-item-text">
          <p contenteditable="true" class="action-item-description">Contact Krispy Kreme, get fundraiser info.</p>
          <p contenteditable="true" class="due-date">due Thursday</p>
        </div>
        <div class="assignees">
          <div class="assignee-photo"></div>
        </div>
      </div>
      <div class="action-item">
        <input type="checkbox">
        <div class="action-item-text">
          <p contenteditable="true" class="action-item-description">Contact Porto's and receive fundraising quotes.</p>
          <p contenteditable="true" class="due-date">due Thursday</p>
        </div>
        <div class="assignees">
          <div class="assignee-photo"></div>
          <div class="assignee-photo"></div>
        </div>
      </div>
      <div class="action-item">
        <input type="checkbox">
        <div class="action-item-text">
          <p contenteditable="true" class="action-item-description">Talk to USG about potential fundraising opportunities.</p>
          <p contenteditable="true" class="due-date">due Thursday</p>
        </div>
        <div class="assignees">
          <div class="assignee-photo"></div>
        </div>
      </div>
      <div class="action-item">
        <input type="checkbox" disabled>
        <div class="action-item-text">
          <p contenteditable="true" class="start-typing-description">Start typing…</p>
          <p contenteditable="true" class="start-typing-due-date">due…</p>
        </div>
        <div class="assignees">
          <i class="fas fa-user-plus"></i>
          <div class="add-assignee">
            <p class="add-team">Add team members…</p>
            <div class="add-assignee-row">
              <div class="add-assignee-img"></div>
              <p class="add-assignee-name">James</p>
            </div>
            <div class="add-assignee-row">
              <div class="add-assignee-img"></div>
              <p class="add-assignee-name">Mars</p>
            </div>
            <div class="add-assignee-row">
              <div class="add-assignee-img"></div>
              <p class="add-assignee-name">Katlyn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
