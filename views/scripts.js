const jobListings = [
    { workType: 'Full-time', income: '50,000 - 70,000', duration: 'Permanent', place: 'HYDERABAB, TELANGANA' },
    { workType: 'Part-time', income: '$20 - $25 per hour', duration: 'Temporary', place: 'MUMBAI,MAHARASHTRA' },
    { workType: 'Remote', income: '$60,000 - $80,000', duration: 'Contract', place: 'BANGALORE, KARNATAKA' }
];

const jobListingsContainer = document.getElementById('jobListings');

jobListings.forEach(job => {
    const jobDiv = document.createElement('div');
    jobDiv.classList.add('job');

    const jobTitle = document.createElement('h2');
    jobTitle.textContent = `${job.workType} Job`;

    const workType = document.createElement('p');
    workType.textContent = `Work Type: ${job.workType}`;

    const income = document.createElement('p');
    income.textContent = `Income: ${job.income}`;

    const duration = document.createElement('p');
    duration.textContent = `Duration: ${job.duration}`;

    const place = document.createElement('p');
    place.textContent = `Place: ${job.place}`;

    jobDiv.appendChild(jobTitle);
    jobDiv.appendChild(workType);
    jobDiv.appendChild(income);
    jobDiv.appendChild(duration);
    jobDiv.appendChild(place);

    jobListingsContainer.appendChild(jobDiv);
});
