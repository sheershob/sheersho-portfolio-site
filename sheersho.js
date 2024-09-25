console.log("Welcome")
// Go to top Button
let mybutton = document.getElementById("myBtn");
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () { scrollFunction() };
    function scrollFunction() {
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    let colorMode = document.getElementById('toggle')

    toggle.addEventListener('click',toggleColor)
     
    function toggleColor(e){
        if (toggle.textContent.includes("🌞")){
            toggle.textContent="🌜"
            document.getElementsByTagName('h1')[0].style.backgroundColor="rgba(0,0,0,0.75)"
            document.getElementsByTagName('h1')[0].style.transition="1.4s"
            // body.style="background-color =blue;"
            // const na = document.getElementById('navBar')
            // na.style.backgroundColor="black";
            // body.style.background='blue';
        }
        else if (toggle.textContent.includes("🌜")){
            toggle.textContent="🌞"
            document.getElementsByTagName('h1')[0].style.backgroundColor="rgba(137, 43, 226, 0.37)"
            document.getElementsByTagName('h1')[0].style.transition="1.4s"
        }
    }

    document.addEventListener("DOMContentLoaded", function(){
        const easyLabel = document.getElementById("easy-label");
        const mediumLabel = document.getElementById("medium-label");
        const hardLabel = document.getElementById("hard-label");
        const easyProgressCircle = document.getElementById("easy-progress");
        const mediumProgressCircle = document.getElementById("medium-progress");
        const hardProgressCircle = document.getElementById("hard-progress");
        const totalProgressCircle = document.getElementById("total-progress");
        const totalLabel = document.getElementById("total-label");
    
    async function fetchStats() {
    try {
        const username = 'sheersho_b';
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        const targetUrl = 'https://leetcode.com/graphql';
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const graphql = JSON.stringify({
            query: `
                query userSessionProgress($username: String!) {
                    allQuestionsCount {
                        difficulty
                        count
                    }
                    matchedUser(username: $username) {
                        submitStats {
                            acSubmissionNum {
                                difficulty
                                count
                                submissions
                            }
                            totalSubmissionNum {
                                difficulty
                                count
                                submissions
                            }
                        }
                    }
                }
            `,
            variables: { username }
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: graphql,
            redirect: "follow"
        };

        const response = await fetch(proxyUrl+targetUrl, requestOptions);
        if (!response.ok) {
            throw new Error("Unable to fetch the User details");
        }

        const parsedData = await response.json();
        console.log("Logging data: ", parsedData);
        displayData(parsedData);
        return data;
    } catch (error) {
        console.error('Error fetching stats:', error);
    }
}
fetchStats().then(data => console.log(data));

function updateProgress(solved, total, label, circle){
    const progressDegree = (solved/total)*100;
    circle.style.setProperty("--progress-degree", `${progressDegree}%`);
    // circle.style.animation = 'progressAnimation 1s ease forwards';
    label.textContent = `${solved} / ${total} `;
    // label.innerHTML = `${label.textContent}<br>${solved} / ${total}`;
}

function displayData(parsedData){
    const totalQues = parsedData.data.allQuestionsCount[0].count; 
    const totalEasyQues = parsedData.data.allQuestionsCount[1].count; 
    const totalMediumQues = parsedData.data.allQuestionsCount[2].count; 
    const totalHardQues = parsedData.data.allQuestionsCount[3].count; 
    const solvedTotalues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count; 
    const solvedTotalEasyQues = parsedData.data.matchedUser.submitStats.
    acSubmissionNum[1].count; 
    const solvedTotalMediumQues = parsedData.data.matchedUser.submitStats. 
    acSubmissionNum[2].count; 
    const solvedTotalHardQues = parsedData.data.matchedUser.submitStats.
    acSubmissionNum[3].count; 
    const totalQuestions = totalEasyQues + totalMediumQues + totalHardQues;
    const totalSolved = solvedTotalEasyQues + solvedTotalMediumQues + solvedTotalHardQues;

        // Update progress for the Total circle
    updateProgress(totalSolved, totalQuestions, totalLabel, totalProgressCircle);
    updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, 
    easyProgressCircle); 
    updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, 
    mediumProgressCircle); 
    updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, 
    hardProgressCircle); 
}
    })
    
    // document.getElementsByTagName('h1')[0].style.backgroundColor="black"
    // const na = document.getElementById('navBar')
    //         na.style.backgroundColor="black"; 