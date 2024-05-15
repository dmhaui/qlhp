//
// ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗     ███████╗██╗██████╗ ███████╗██████╗  █████╗ ███████╗███████╗
// ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝     ██╔════╝██║██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝
// ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗    █████╗  ██║██████╔╝█████╗  ██████╔╝███████║███████╗█████╗  
// ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║    ██╔══╝  ██║██╔══██╗██╔══╝  ██╔══██╗██╔══██║╚════██║██╔══╝  
// ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝    ██║     ██║██║  ██║███████╗██████╔╝██║  ██║███████║███████╗
//  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝     ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝


import { fetchToken, onMessageListener, db,
    ref, 
    get, set, child, update, 
    remove, onValue, OnDisconnect, 
    serverTimestamp, onChildChanged,orderByValue ,
    onChildAdded,onChildMoved, onChildRemoved,

    auth
 } from './firebase.js';

import {setupSignOutButton } from "./Auth/app.js";
setupSignOutButton();

document.addEventListener("DOMContentLoaded", async () => {
    // Đăng ký service worker
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            // console.log('Service Worker registration successful with scope: ', registration.scope);

            // Lấy token cho thông báo đẩy
            const token = await fetchToken(setTokenFound);

            if (token) {
                console.log("Token fetched: ",token);
                //  Lưu token vào cơ sở dữ liệu Firebase
                  const userRef = ref(db, `users/${loggedInUser.uid}`);
                  set(userRef, { token: token }); // Sử dụng update để cập nhật một giá trị trong cơ sở dữ liệu
            }

            // Thiết lập listener cho thông báo
            onMessageListener().then(payload => {
                console.log("Thông báo nhận được: ", payload);
            }).catch((err) => {
                console.error('Lỗi khi thiết lập listener thông báo:', err);
            });

        } catch (err) {
            console.log('Service Worker registration failed: ', err);
        }
    } else {
        console.log('Service Worker not supported in this browser.');
    }
});


function setTokenFound(found) {
    if (found || found !== null) {
        // console.log("found: "+found);
        // khi thấy token thì làm gì ở đây nè
    } else {
        console.log("Token not found.");
    }
}
// Lấy quyền sử dụng thông báo

// Yêu cầu sự cho phép từ trình duyệt
if (Notification.permission !== 'granted') {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            // Lấy token thiết bị và lưu vào cơ sở dữ liệu

        } else {
            console.log('Unable to get permission to notify.');
            alert("Vui lòng cho phép thông báo!");
            Notification.requestPermission();
        }
    });
}




////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

    //              EMAILJS
    (() => {
        "use strict";
        var e = {
                d: (t, r) => {
                    for (var i in r) e.o(r, i) && !e.o(t, i) && Object.defineProperty(t, i, {
                        enumerable: !0,
                        get: r[i]
                    })
                },
                o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
                r: e => {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module"
                    }), Object.defineProperty(e, "__esModule", {
                        value: !0
                    })
                }
            },
            t = {};
        e.r(t), e.d(t, {
            default: () => l,
            init: () => i,
            send: () => a,
            sendForm: () => d
        });
        const r = {
                _origin: "https://api.emailjs.com"
            },
            i = function(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "https://api.emailjs.com";
                r._userID = e, r._origin = t
            },
            s = (e, t, r) => {
                if (!e) throw "The public key is required. Visit https://dashboard.emailjs.com/admin/account";
                if (!t) throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
                if (!r) throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";
                return !0
            };
        class o {
            constructor(e) {
                this.status = e ? e.status : 0, this.text = e ? e.responseText : "Network Error"
            }
        }
        const n = function(e, t) {
                let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return new Promise(((s, n) => {
                    const a = new XMLHttpRequest;
                    a.addEventListener("load", (e => {
                        let {
                            target: t
                        } = e;
                        const r = new o(t);
                        200 === r.status || "OK" === r.text ? s(r) : n(r)
                    })), a.addEventListener("error", (e => {
                        let {
                            target: t
                        } = e;
                        n(new o(t))
                    })), a.open("POST", r._origin + e, !0), Object.keys(i).forEach((e => {
                        a.setRequestHeader(e, i[e])
                    })), a.send(t)
                }))
            },
            a = (e, t, i, o) => {
                const a = o || r._userID;
                s(a, e, t);
                const d = {
                    lib_version: "3.12.1",
                    user_id: a,
                    service_id: e,
                    template_id: t,
                    template_params: i
                };
                return n("/api/v1.0/email/send", JSON.stringify(d), {
                    "Content-type": "application/json"
                })
            },
            d = (e, t, i, o) => {
                const a = o || r._userID,
                    d = (e => {
                        let t;
                        if (t = "string" == typeof e ? document.querySelector(e) : e, !t || "FORM" !== t.nodeName) throw "The 3rd parameter is expected to be the HTML form element or the style selector of form";
                        return t
                    })(i);
                s(a, e, t);
                const l = new FormData(d);
                return l.append("lib_version", "3.12.1"), l.append("service_id", e), l.append("template_id", t), l.append("user_id", a), n("/api/v1.0/email/send-form", l)
            },
            l = {
                init: i,
                send: a,
                sendForm: d
            };
        self.emailjs = t
    })();
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

function sendMail(studentName, parentName, parentEmail, className, classType, classTime, classDays, missingMonths, amountDue, amountDueByWord) {
    (function () {
        emailjs.init("ml77QMzh4pa3L8KP-"); // Account Public Key
    })();
    
    var params = {
        studentName, 
        parentName, 
        parentEmail, 
        className, 
        classType, 
        classTime, 
        classDays, 
        missingMonths, 
        amountDue,
        amountDueByWord
    };
    var serviceID = "service_709ce5j"; // Email Service ID
    var templateID = "template_q62faon"; // Email Template ID

    emailjs.send(serviceID, templateID, params)
    .then( res => {
        alert("Email Sent Successfully!");
    })
    .catch();
}


// Hàm chuyển đổi số tháng sang tên tháng
function getMonthName(monthIndex) {
    const months = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
        "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];
    return months[monthIndex - 1]; // Giảm đi 1 vì mảng bắt đầu từ 0
}

// Hàm lấy thông tin về thanh toán và số tiền còn thiếu
function getPaymentInfo(paymentData, tuitionFee) {
    let missingMonths = [];
    let totalDue = 0;
    const feeInt = parseInt(tuitionFee); // Chuyển đổi học phí thành số nguyên

    for (const month in paymentData) {
        if (!paymentData[month].da_nop) {
            missingMonths.push(getMonthName(parseInt(month.split('_')[1]))); // Lấy tên tháng
            totalDue += feeInt; // Sử dụng học phí đã chuyển đổi thành số nguyên
        } else if (paymentData[month].da_nop && parseInt(paymentData[month].so_tien) < feeInt) {
            // Nếu đã nộp nhưng nộp thiếu, tính cả số tiền thiếu vào tổng số tiền còn thiếu
            const amountPaid = parseInt(paymentData[month].so_tien);
            totalDue += feeInt - amountPaid;
            missingMonths.push(`${getMonthName(parseInt(month.split('_')[1]))} (thiếu ${feeInt - amountPaid})`);
        }
    }

    return {
        missingMonths: missingMonths.join(', '),
        amountDue: totalDue
    };
}

function sendEmailForStudents(){
    // Lấy danh sách tất cả các lớp học
    const classesRef = ref(db, 'class');


    // Lấy thông tin về tất cả các lớp học
    get(classesRef).then((classesSnapshot) => {
        const classData = classesSnapshot.val();
        // Lặp qua từng lớp học
        classData.forEach((classItem ) => {
            
            const classKey = classItem .key;
            const className = classItem.ten_lop;
            const tuitionFee = classItem.hoc_phi;
            const classType = classItem.loai;
            const classTime = classItem.gio_day;
            const classDaysEnglish = classItem.ngay;
            var englishToVietnamese = {
                "monday": "Thứ 2",
                "tuesday": "Thứ 3",
                "wednesday": "Thứ 4",
                "thursday": "Thứ 5",
                "friday": "Thứ 6",
                "saturday": "Thứ 7",
                "sunday": "Chủ nhật"
            };
            var classDays = englishToVietnamese[classDaysEnglish];
            try {
                classItem.hocsinh.forEach(student => {
                    const studentName = student.ten_hs;
                    const parentName = student.ten_ph;
                    const parentEmail = student.email_ph;
                    const paymentInfo = getPaymentInfo(student.thanh_toan, tuitionFee);
                    const missingMonths = paymentInfo.missingMonths;
                    const amountDue = paymentInfo.amountDue;
                    const amountDueByWord = convertToVietnamese(amountDue);
        
                    // Gửi email cho phụ huynh
                    // sendMail(studentName, parentName, parentEmail, className, classType, classTime, classDays, missingMonths, amountDue, amountDueByWord);
                });
            } catch (error) {
                // console.log(error);
            }

        });
    });
}
sendEmailForStudents();
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


// const messaging = getMessaging(app); // Lấy đối tượng messaging từ Firebase


// getToken(messaging, { vapidKey: "BGsG6ApNPROgnT8g-sMCEknmf5sxSpLSQli9fcSarRtDvaG40FR0ECg4RUVC1NK77M0r_iDygqjfhxePf8HQmBs" })
//     .then((currentToken) => {
//         if (currentToken) {
//             // Send the token to your server and update the UI if necessary
//             // ...
//         } else {
//             // Show permission request UI
//             console.log('No registration token available. Request permission to generate one.');
//             // ...
//         }
//     }).catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//         // ...
//     });

//     getToken(messaging, { vapidKey: "BGsG6ApNPROgnT8g-sMCEknmf5sxSpLSQli9fcSarRtDvaG40FR0ECg4RUVC1NK77M0r_iDygqjfhxePf8HQmBs" })
//     .then((currentToken) => {
//         if (currentToken) {
//             // Send the token to your server and update the UI if necessary
//             // // Cái này hay nè, nhớ lưu
//               messaging.getToken()
//                 .then((token) => {
//                   // Lưu token vào cơ sở dữ liệu Firebase
//                   const userRef = ref(db, `users/${user.uid}`);
//                   update(userRef, { token: token }); // Sử dụng update để cập nhật một giá trị trong cơ sở dữ liệu
//                   console.log('Token:', token);
//                 })
//                 .catch((err) => {
//                   console.log('Error getting token:', err);
//                 });
//             // ...
//         } else {
//             // Show permission request UI
//             console.log('No registration token available. Request permission to generate one.');
//             // ...
//         }
//     }).catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//         // ...
//     });


// Cập nhật thay đổi trong mục class trong database

// Tạo tham chiếu đến "class"
const classFatherRef = ref(db, 'class');

// Theo dõi sự kiện child_changed trên "class"
onChildChanged(classFatherRef, (snapshot) => {
    // Cập nhật thời gian vào "lastModified" khi có thay đổi trong "class"
    updateLastModified();
});
// Theo dõi sự kiện child_add trên "class"
onChildAdded(classFatherRef, (snapshot) => {
    // Cập nhật thời gian vào "lastModified" khi có thay đổi trong "class"
    updateLastModified();
});
// Theo dõi sự kiện child_movetrên "class"
onChildMoved(classFatherRef, (snapshot) => {
    // Cập nhật thời gian vào "lastModified" khi có thay đổi trong "class"
    updateLastModified();
});
// Theo dõi sự kiện child_remove trên "class"
onChildRemoved(classFatherRef, (snapshot) => {
    // Cập nhật thời gian vào "lastModified" khi có thay đổi trong "class"
    updateLastModified();
});

// Hàm cập nhật thời gian trong "lastModified"
function updateLastModified() {
    // Cập nhật thời gian vào "lastModified" với giá trị serverTimestamp
    update(ref(db, 'lastModified'), { timestamp: serverTimestamp() })
        .then(() => {
            // console.log('Cập nhật thời gian thành công');
        })
        .catch((error) => {
            console.error('Lỗi khi cập nhật thời gian:', error);
        });
}


// Function to add new month for payment for each student
// Sang tháng mới add tháng mới
function addNewMonthForAllStudents() {
    // Lấy danh sách tất cả các lớp học
    const classesRef = ref(db, 'class');

    // Lấy thông tin về tất cả các lớp học
    get(classesRef).then((classesSnapshot) => {
        // Lặp qua từng lớp học
        classesSnapshot.forEach((classData) => {
            const classKey = classData.key;

            // Lấy danh sách học sinh trong lớp học hiện tại
            const studentsRef = ref(db, `class/${classKey}/hocsinh`);

            // Lấy thông tin về tất cả các học sinh trong lớp học hiện tại
            get(studentsRef).then((studentsSnapshot) => {
                // Lặp qua từng học sinh trong lớp học hiện tại
                studentsSnapshot.forEach((studentData) => {
                    const studentId = studentData.key;
                    const student = studentData.val();

                    // Tạo chuỗi đại diện cho tháng mới
                    const monthCreate = "thang_" + (new Date().getMonth() + 1);

                    // Kiểm tra xem tháng mới đã tồn tại trong thanh_toan của học sinh chưa
                    if (!(monthCreate in student.thanh_toan)) {
                        // Nếu tháng chưa tồn tại, thêm thông tin tháng mới vào đối tượng thanh_toan của học sinh
                        student.thanh_toan[monthCreate] = { "da_nop": false, "ngay_nop": "", "ghi_chu": "" };

                        // Cập nhật thông tin học sinh trong Firebase với tháng mới được thêm vào
                        update(ref(db, `class/${classKey}/hocsinh/${studentId}`), { thanh_toan: student.thanh_toan })
                            .then(() => {
                                console.log(`Đã cập nhật tháng mới cho học sinh ${studentId} trong lớp ${classKey}`);
                            })
                            .catch((error) => {
                                console.error(`Lỗi khi cập nhật tháng mới cho học sinh ${studentId} trong lớp ${classKey}: ${error}`);
                            });
                    } else {
                        console.log(`Tháng ${monthCreate} đã tồn tại cho học sinh ${studentId} trong lớp ${classKey}`);
                    }
                });
            });
        });
    });
}



// Thực hiện kiểm tra và thực hiện hàm khi qua một tháng mới hoặc một năm mới
function checkAndPerformMonthlyYearlyTask() {
    // Lấy timestamp của lần truy cập cuối cùng từ cơ sở dữ liệu
    const lastModifiedRef = ref(db, 'lastModified');
    get(lastModifiedRef).then((snapshot) => {
        const lastModifiedData = snapshot.val();

        // Lấy timestamp
        const lastModifiedTimestamp = lastModifiedData.timestamp;
        const lastModifiedDate = new Date(lastModifiedTimestamp);

        // Lấy ngày hiện tại
        const currentDate = new Date();

        // Kiểm tra xem đã qua một tháng mới chưa
        if (lastModifiedDate.getMonth() !== currentDate.getMonth()) {
            // Thực hiện hàm khi qua một tháng mới
            addNewMonthForAllStudents();
        }

        // Kiểm tra xem đã qua một năm mới chưa
        if (lastModifiedDate.getFullYear() !== currentDate.getFullYear()) {
            // Thực hiện hàm khi qua một năm mới
            resetMonthEveryNewYear();
        }

        // Cập nhật timestamp của lần truy cập mới nhất
        updateLastModified(currentDate.getTime());
    });
}

function resetMonthEveryNewYear() {
    // Lấy danh sách tất cả các lớp học
    const classesRef = ref(db, 'class');

    // Lấy thông tin về tất cả các lớp học
    get(classesRef).then((classesSnapshot) => {
        // Lặp qua từng lớp học
        classesSnapshot.forEach((classData) => {
            const classKey = classData.key;

            // Lấy danh sách học sinh trong lớp học hiện tại
            const studentsRef = ref(db, `class/${classKey}/hocsinh`);

            // Lấy thông tin về tất cả các học sinh trong lớp học hiện tại
            get(studentsRef).then((studentsSnapshot) => {
                // Lặp qua từng học sinh trong lớp học hiện tại
                studentsSnapshot.forEach((studentData) => {
                    const studentId = studentData.key;
                    const student = studentData.val();

                    var studentData = {
                        "thanh_toan": { "da_nop": false, "ngay_nop": "", "ghi_chu": "" }
                    };

                    // Cập nhật thông tin học sinh trong Firebase với tháng mới được thêm vào
                    update(ref(db, `class/${classKey}/hocsinh/${studentId}`), studentData)
                        .then(() => {
                            console.log(`Đã reset tháng cho học sinh ${studentId} trong lớp ${classKey}`);
                        })
                        .catch((error) => {
                            console.error(`Lỗi khi reset tháng cho học sinh ${studentId} trong lớp ${classKey}: ${error}`);
                        });
                });
            });
        });
    });
}
checkAndPerformMonthlyYearlyTask();


auth.languageCode = "en";
// const provider = new GoogleAuthProvider();

let user = null


// const signInUserWithGoogle = () => {
//     auth.signInWithPopup(provider).then(res => {
//         console.log(res)
//         // var token = res.credential.accessToken;
//         // console.log(token)
//         user = res.user
//     }).catch(err => {
//         errorHandler(err)
//     })
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// main.js
// Lấy ngày tháng hiện tại
var currentDate = new Date();
// Định dạng giờ và phút
var hours = currentDate.getHours();
var minutes = currentDate.getMinutes();
// Định dạng ngày và tháng
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
// Kiểm tra nếu giờ hoặc phút nhỏ hơn 10, thêm số 0 phía trước
hours = hours < 10 ? '0' + hours : hours;
minutes = minutes < 10 ? '0' + minutes : minutes;
// Định dạng ngày và tháng, nếu nhỏ hơn 10, thêm số 0 phía trước
day = day < 10 ? '0' + day : day;
month = month < 10 ? '0' + month : month;
// Hiển thị ngày tháng theo định dạng mong muốn: 17:35 12/02
var formattedDate = hours + ':' + minutes + ' ' + day + '/' + month;

// Kiểm tra nếu đang ở trang collection-student.html
if (document.URL.includes("collection-student.html")) {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // ██████╗ ██████╗ ██╗     ██╗     ███████╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
    // ██╔════╝██╔═══██╗██║     ██║     ██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
    // ██║     ██║   ██║██║     ██║     █████╗  ██║        ██║   ██║██║   ██║██╔██╗ ██║
    // ██║     ██║   ██║██║     ██║     ██╔══╝  ██║        ██║   ██║██║   ██║██║╚██╗██║
    // ╚██████╗╚██████╔╝███████╗███████╗███████╗╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
    //  ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    document.addEventListener("DOMContentLoaded", function () {
        try {
            const collectionButton = document.getElementById("collection-btn");
            collectionButton.addEventListener("click", function () { CollectionStudent(); });
        } catch (error) {
            console.log(error);
        };
        // Function to extract classKey and studentKey from URL
        function getKeysFromURL() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            return {
                classKey: urlParams.get('classKey'),
                studentKey: urlParams.get('studentKey')
            };
        }

        // Function to fetch class name from Firebase based on classKey
        function fetchClassName(classKey) {
            const classRef = ref(db, "class/" + classKey + "/ten_lop");
            return get(classRef);
        }

        // Function to fetch student name from Firebase based on studentKey
        function fetchStudentName(classKey, studentKey) {
            const studentRef = ref(db, "class/" + classKey + "/hocsinh/" + studentKey + "/ten_hs");
            return get(studentRef);
        }

        // Function to update breadcrumb with class name and student name
        function updateBreadcrumb(className, studentName) {
            const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
            if (breadcrumbItems.length >= 3) {
                breadcrumbItems[1].textContent = "Danh sách học sinh: " + className;
                breadcrumbItems[2].textContent = "Thu tiền của: " + studentName;
            }
        }

        // Get classKey and studentKey from URL
        const { classKey, studentKey } = getKeysFromURL();
        if (classKey && studentKey) {
            // Fetch class name and student name from Firebase
            Promise.all([fetchClassName(classKey), fetchStudentName(classKey, studentKey)])
                .then(([classSnapshot, studentSnapshot]) => {
                    const className = classSnapshot.val();
                    const studentName = studentSnapshot.val();
                    // Update breadcrumb with class name and student name
                    updateBreadcrumb(className, studentName);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }

    });

    function CollectionStudent() {

        var url = new URL(window.location.href);
        var studentKey = url.searchParams.get("studentKey");
        var classKey = url.searchParams.get("classKey");

        if (!studentKey) {
            console.log("Student Key không tồn tại trong URL.");
            window.location.href = "index.html";
        }

        // Lấy thông tin học sinh từ cơ sở dữ liệu Firebase
        const studentRef = ref(db, `class/${classKey}/hocsinh/` + studentKey);
        get(studentRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // Lấy dữ liệu của học sinh từ snapshot
                    const studentData = snapshot.val();

                    // Lấy thông tin cần thiết từ giao diện người dùng
                    var thang1 = document.getElementById("idCollection").value;
                    var note = document.getElementById("noteCollection").value;
                    const thang2 = `thang_${thang1}`;

                    // Kiểm tra xem đã nhập số tiền hay chưa
                    var amountOfMoney = document.getElementById("amountOfMoney").value;
                    if (!amountOfMoney) {
                        alert("Vui lòng nhập số tiền thu tháng " + thang1);
                        return; // Dừng hàm nếu số tiền chưa được nhập
                    }

                    // Kiểm tra xem tháng cần sửa có tồn tại trong dữ liệu học sinh hay không
                    if (studentData.thanh_toan && studentData.thanh_toan[thang2]) {
                        // Sửa thông tin tháng trong dữ liệu học sinh
                        studentData.thanh_toan[thang2] = {
                            "da_nop": true,
                            "ngay_nop": formattedDate,
                            "so_tien": amountOfMoney,
                            "ghi_chu": note
                        };

                        // Thêm trường cap_nhat với giá trị mới vào đối tượng studentData
                        studentData.cap_nhat = formattedDate;

                        // Cập nhật thông tin học sinh trong Firebase
                        update(ref(db, `class/${classKey}/hocsinh/` + studentKey), studentData)
                            .then(() => {
                                alert("Thu tiền thành công");
                                // Sau khi cập nhật thành công, cập nhật lại danh sách học sinh
                                updateStudentTable();
                            })
                            .catch((error) => {
                                alert("Lỗi khi thu tiền: " + error);
                            });
                    } else {
                        console.log("Không tìm thấy thông tin tháng cần sửa.");
                    }
                } else {
                    console.log("Không tìm thấy học sinh trong cơ sở dữ liệu.");
                }
            })
            .catch((error) => {
                console.error("Lỗi khi lấy thông tin học sinh từ cơ sở dữ liệu:", error);
            });
    }



    // Function to continuously update student list for collection money from student/ thu tiền học
    function updateStudentTable() {
        // Lấy studentKey từ URL
        const urlParams = new URLSearchParams(window.location.search);
        const studentKey = urlParams.get('studentKey');
        var classKey = urlParams.get('classKey');
        // Reference tới nút chứa tbody của bảng
        const tableBody = document.getElementById("tableBody");

        // Tạo reference tới node trong Firebase của học sinh cụ thể
        const studentRef = ref(db, `class/${classKey}/hocsinh/${studentKey}`);

        // Lắng nghe sự thay đổi trong node học sinh cụ thể
        onValue(studentRef, (snapshot) => {
            const studentData = snapshot.val();
            // Xóa nội dung cũ của tbody
            tableBody.innerHTML = "";

            // Thêm dữ liệu mới vào tbody
            for (const thang in studentData.thanh_toan) {
                const monthData = studentData.thanh_toan[thang];
                const monthNumber = parseInt(thang.split('_')[1]); // Lấy số tháng từ chuỗi thang_x
                const tr = document.createElement("tr");

                // Trạng thái thanh toán
                const statusBadge = monthData && monthData.da_nop ? '<span class="badge badge-pill bg-success-light">Đã hoàn thành</span>' : '<span class="badge badge-pill bg-danger-light">Chưa hoàn thành</span>';

                // Ngày nộp
                var ngayNop = monthData && monthData.ngay_nop ? monthData.ngay_nop : "-";
                var ghiChu = monthData && monthData.ghi_chu ? monthData.ghi_chu : "-";
                var soTien = monthData && monthData.so_tien ? monthData.so_tien : "-";

                // Button thu tiền
                const collectionButton = !monthData || !monthData.da_nop ? `<a data-toggle="modal" href="#collection_modal" data-id="${monthNumber}" class="btn btn-sm bg-danger-light btn-delete-speciality" onclick="FillCollectionModal(${monthNumber})"> <i class="fe fe-trash"></i>Thu tiền</a>` : '';

                tr.innerHTML = `
                    <td data-title="Tháng">${monthNumber}</td>
                    <td data-title="Trạng thái">${statusBadge}</td>
                    <td data-title="Ghi chú">${ghiChu}</td>
                    <td data-title="Ngày nộp">${ngayNop}</td>
                    <td data-title="Số tiền">${soTien}</td>
                    <td class="text-right">${collectionButton}</td>
                `;
                tableBody.appendChild(tr);
            }
        });
    }

    window.onload = updateStudentTable();

}
// Kiểm tra nếu đang ở trang student-list.html
else if (document.URL.includes("student-list.html")) {
    // Thực thi mã JS cho trang student-list.html ở đây
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // ███████╗████████╗██╗   ██╗██████╗ ███████╗███╗   ██╗████████╗
    // ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██╔════╝████╗  ██║╚══██╔══╝
    // ███████╗   ██║   ██║   ██║██║  ██║█████╗  ██╔██╗ ██║   ██║   
    // ╚════██║   ██║   ██║   ██║██║  ██║██╔══╝  ██║╚██╗██║   ██║   
    // ███████║   ██║   ╚██████╔╝██████╔╝███████╗██║ ╚████║   ██║   
    // ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                                                                     
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    document.addEventListener("DOMContentLoaded", function () {
        try {
            const addButton = document.getElementById("add-btn");
            addButton.addEventListener("click", function () { AddStudent(); });
            const editButton = document.getElementById("edit-btn");
            editButton.addEventListener("click", function () { EditStudent(); });
            const deleteButton = document.getElementById("delete-btn");
            deleteButton.addEventListener("click", function () { DeleteStudent(); });
            // Function to extract classKey from URL
            function getClassKeyFromURL() {
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                return urlParams.get('classKey');
            }

            // Function to fetch class name from Firebase based on classKey
            function fetchClassName(classKey) {
                const classRef = ref(db, "class/" + classKey + "/ten_lop");
                get(classRef).then((snapshot) => {
                    const className = snapshot.val();
                    // Update breadcrumb with class name
                    updateBreadcrumb(className);
                }).catch((error) => {
                    console.error("Error fetching class name:", error);
                });
            }

            // Function to update breadcrumb with class name
            function updateBreadcrumb(className) {
                const breadcrumbItem = document.querySelector('.breadcrumb-item.active');
                if (breadcrumbItem) {
                    breadcrumbItem.textContent = "Danh sách học sinh lớp " + className;
                }
            }

            // Get classKey from URL
            const classKey = getClassKeyFromURL();
            if (classKey) {
                // Fetch class name from Firebase
                fetchClassName(classKey);
            }
        } catch (error) {
            console.log(error);
        };

    });
    function DeleteStudent() {
        var url = new URL(window.location.href);
        var classKey = url.searchParams.get("classKey");
        var studentId = document.getElementById("studentIdDel").value;
        // Xoá thông tin học sinh trong Firebase
        remove(ref(db, `class/${classKey}/hocsinh/` + studentId))
            .then(() => {
                alert("Xoá học sinh thành công");
                updateStudentList();
            })
            .catch((error) => {
                alert("Lỗi khi xoá học sinh: " + error);
            });
    }
    function EditStudent() {
        var url = new URL(window.location.href);
        var classKey = url.searchParams.get("classKey");
        var studentId = document.getElementById("studentIdEdit").value;
        var studentName = document.getElementById("studentNameEdit").value;
        var parentPhonePre = document.getElementById("parentPhoneEdit").value;
        var parentPhone = parentPhonePre;
        var parentName = document.getElementById("parentNameEdit").value;
        var note = document.getElementById("noteEdit").value;
        var parentEmailEdit = document.getElementById("parentEmailEdit").value;
        // Kiểm tra tính hợp lệ của tên sinh viên (ít nhất 2 ký tự)
        if (/[\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/.test(studentName) || studentName.length < 2) {
            alert("Tên sinh viên không hợp lệ.");
            return;
        }

        // Kiểm tra tính hợp lệ của số điện thoại phụ huynh
        var phonePattern = /^(03|05|07|08|09)[0-9]{8}$/;
        if (!phonePattern.test(parentPhone)) {
            alert("Số điện thoại phụ huynh không hợp lệ.");
            return;
        }

        // Kiểm tra tính hợp lệ của tên phụ huynh (ít nhất 2 ký tự)
        if (/[\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/.test(parentName) || parentName.length < 2) {
            alert("Tên phụ huynh không hợp lệ.");
            return;
        }
        // Tạo đối tượng chứa thông tin học sinh
        var studentData = {
            "ten_hs": studentName,
            "sdt_ph": parentPhone,
            "ten_ph": parentName,
            "ghi_chu": note,
            "email_ph": parentEmailEdit,
            "cap_nhat": formattedDate,
        };
        // Sửa thông tin học sinh trong Firebase
        update(ref(db, `class/${classKey}/hocsinh/` + studentId), studentData)
            .then(() => {
                alert("Sửa học sinh thành công");
                updateStudentList();
            })
            .catch((error) => {
                alert("Lỗi khi sửa học sinh: " + error);
            });
    }
    function AddStudent() {
        var url = new URL(window.location.href);
        var classKey = url.searchParams.get("classKey");
        // Lấy thông tin học sinh
        var studentName = document.getElementById("studentName").value;
        var parentPhonePre = document.getElementById("parentPhone").value;
        var parentPhone = parentPhonePre;
        var parentName = document.getElementById("parentName").value;
        var note = document.getElementById("note").value;
        var parentEmail = document.getElementById("parentEmail").value;
        // Kiểm tra tính hợp lệ của tên sinh viên (ít nhất 2 ký tự)
        if (/[\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/.test(studentName) || studentName.length < 2) {
            alert("Tên sinh viên không hợp lệ.");
            return;
        }

        // Kiểm tra tính hợp lệ của số điện thoại phụ huynh
        var phonePattern = /^(03|05|07|08|09)[0-9]{8}$/;
        if (!phonePattern.test(parentPhone)) {
            alert("Số điện thoại phụ huynh không hợp lệ.");
            return;
        }

        // Kiểm tra tính hợp lệ của tên phụ huynh (ít nhất 2 ký tự)
        if (/[\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/.test(parentName) || parentName.length < 2) {
            alert("Tên phụ huynh không hợp lệ.");
            return;
        }
        var monthCreate = "thang_" + (new Date().getMonth() + 1);
        // Tạo đối tượng chứa thông tin học sinh
        var studentData = {
            "ten_hs": studentName,
            "sdt_ph": parentPhone,
            "ten_ph": parentName,
            "ghi_chu": note,
            "email_ph": parentEmail,
            "cap_nhat": formattedDate,
            "thanh_toan": {
                [monthCreate]: { "da_nop": false, "ngay_nop": "", "ghi_chu": "" },
            }
        };

            // Kiểm tra xem thông tin học sinh mới có trùng lặp với thông tin của các học sinh khác không
            const classRef = ref(db, `class/${classKey}/hocsinh/`);
            get(classRef).then((snapshot) => {
                const studentList = snapshot.val();
                let isDuplicate = false;
                if (studentList) {
                    // Lặp qua danh sách học sinh để kiểm tra trùng lặp
                    for (const studentID in studentList) {
                        const student = studentList[studentID];
                        if (student.ten_hs === studentName && student.sdt_ph === parentPhone && student.ten_ph === parentName && student.ghi_chu === note) {
                            isDuplicate = true;
                            break;
                        }
                    }
                }

                if (isDuplicate) {
                    // Thông báo nếu thông tin học sinh mới trùng lặp với một học sinh khác
                    alert("Thông tin học sinh này đã tồn tại trong lớp.");
                } else {
                    // Thêm học sinh mới vào Firebase nếu không trùng lặp
                    const studentList = snapshot.val();
                    let nextStudentID = 1; // Giả sử ID bắt đầu từ 1
                    if (studentList) {
                        // Lặp qua danh sách học sinh để tìm ID lớn nhất
                        for (const studentID in studentList) {
                            nextStudentID = Math.max(nextStudentID, parseInt(studentID) + 1);
                        }
                    }
                    // Thêm thông tin học sinh vào Firebase với ID đã tính toán được
                    set(ref(db, `class/${classKey}/hocsinh/` + nextStudentID), studentData)
                        .then(() => {
                            alert("Thêm học sinh thành công");
                            updateStudentList(); // Cập nhật lại danh sách học sinh sau khi thêm
                        })
                        .catch((error) => {
                            alert("Lỗi khi thêm học sinh: " + error);
                        });
                }
            });

    }

    function updateStudentList() {
        var url = new URL(window.location.href);
        var classKey = url.searchParams.get("classKey");
        const classRef = ref(db, `class/${classKey}/hocsinh/`);
        // Get class information including tuition fee
        const classInfoRef = ref(db, `class/${classKey}`);
        onValue(classInfoRef, (classSnapshot) => {
            const classData = classSnapshot.val();
            const tuitionFee = classData && classData.hoc_phi ? classData.hoc_phi : "Không xác định";

            // Update HTML with tuition fee
            const tuitionElement = document.getElementById("tuitionFee");
            tuitionElement.textContent = `${tuitionFee}`;
        });
        // Listen for changes in the "hocsinh" node
        onValue(classRef, (snapshot) => {
            const studentList = snapshot.val();

            // const className = studentList ? studentList.ten_lop : "Lớp không xác định"; // Lấy tên lớp từ dữ liệu Firebase
            // const classBreadcrumb = document.querySelector(".breadcrumb-item.active");
            // classBreadcrumb.textContent = `Danh sách học sinh lớp ${className}`;

            const tableBody = document.getElementById("tableBody");
            tableBody.innerHTML = ""; // Clear existing rows
            // Check if there are any students
            if (studentList) {
                let index = 1;
                // Loop through each student and append a row to the table
                for (const studentKey in studentList) {
                    if (Object.hasOwnProperty.call(studentList, studentKey)) {
                        const studentData = studentList[studentKey];
                        const tr = document.createElement("tr");

                        const ghiChu = studentData && studentData.ghi_chu ? studentData.ghi_chu : "-";
                        // Check if the student has paid for all months
                        const allMonthsPaid = Object.values(studentData.thanh_toan).every(month => month.da_nop);
                        const statusBadge = allMonthsPaid ? '<span class="badge badge-pill bg-success-light">Đã hoàn thành</span>' : '<span class="badge badge-pill bg-danger-light">Chưa hoàn thành</span>';
                        tr.innerHTML = `
                        <td data-title="STT">${index}</td>
                        <td data-title="Tên">${studentData.ten_hs}</td>
                        <td data-title="SĐT PH">${studentData.sdt_ph}</td>
                        <td data-title="Phụ huynh">${studentData.ten_ph}</td>
                        <td data-title="Ghi chú">${ghiChu}</td>
                        <td data-title="Trạng thái">${statusBadge}</td>
                        <td data-title="Email PH">${studentData.email_ph}</td>
                        <td>
                            <button class="btn btn-sm bg-primary-light" onclick="window.location.href = 'collection-student.html?studentKey=${studentKey}&classKey=${classKey}'" data-id="' + ${studentKey} + '"><i class=""></i> Thu tiền</button>
                            <button class="btn btn-edit btn-sm bg-success-light" onclick="FillEditModal('${studentKey}', '${studentData.ten_hs}','${studentData.sdt_ph}', '${studentData.ten_ph}', '${studentData.ghi_chu}', '${studentData.email_ph}')" data-toggle="modal" data-dismiss="modal" data-target="#edit_student"><i class="fe fe-pencil"></i> Sửa</button>
                            <button class="btn btn-danger btn-sm" onclick="FillDeleteModal('${studentKey}', '${studentData.ten_hs}')" data-dismiss="modal" data-toggle="modal" data-target="#delete_modal">Xóa</button>
                        </td>
                    `;
                        tableBody.appendChild(tr);
                        index++;
                    }
                }
            } else {
                // If there are no students, display a message
                tableBody.innerHTML = `<tr><td colspan="8">Không có học sinh nào trong lớp này.</td></tr>`;
            }
        });
    }
    window.onload = updateStudentList();
}
// Kiểm tra nếu đang ở trang class-list.html
else if (document.URL.includes("class-list.html")) {
    // Thực thi mã JS cho trang class-list.html ở đây
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // ██████╗██╗      █████╗ ███████╗███████╗
    // ██╔════╝██║     ██╔══██╗██╔════╝██╔════╝
    // ██║     ██║     ███████║███████╗███████╗
    // ██║     ██║     ██╔══██║╚════██║╚════██║
    // ╚██████╗███████╗██║  ██║███████║███████║
    //  ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                                            
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function updateClassList() {
        const classRef = ref(db, "class");
        // Listen for changes in the "class" node
        onValue(classRef, (snapshot) => {
            const classList = snapshot.val();

            const tableBody = document.getElementById("tableBody");
            tableBody.innerHTML = ""; // Clear existing rows
            // Check if there are any classes
            if (classList) {
                let index = 1;
                // Loop through each class and append a row to the table
                for (const classKey in classList) {
                    if (Object.hasOwnProperty.call(classList, classKey)) {
                        const classData = classList[classKey];
                        const tr = document.createElement("tr");


                        const tongHocSinh = classData && classData.hocsinh ? Object.keys(classData.hocsinh).length : 0;
                        // Chuyển thứ trong tuần từ tiếng Anh sang tiếng Việt để hiển thị
                        const daysOfWeek = {
                            "monday": "Thứ 2",
                            "tuesday": "Thứ 3",
                            "wednesday": "Thứ 4",
                            "thursday": "Thứ 5",
                            "friday": "Thứ 6",
                            "saturday": "Thứ 7",
                            "sunday": "Chủ nhật"
                        };
                        try {
                            const ngayHoc = Object.keys(classData.ngay).map(day => daysOfWeek[classData.ngay[day]] || classData.ngay[day]).join(', ');
                            tr.innerHTML = `
                    <td data-title="STT">${index}</td>
                    <td data-title="Tên lớp">${classData.ten_lop}</td>
                    <td data-title="Loại">${classData.loai}</td>
                    <td data-title="Ngày">${ngayHoc}</td>`

                        } catch (error) {
                            tr.innerHTML = `
                    <td data-title="STT">${index}</td>
                    <td data-title="Tên lớp">${classData.ten_lop}</td>
                    <td data-title="Loại">${classData.loai}</td>
                    <td data-title="Ngày">${classData.ngay}</td>`
                        }


                        tr.innerHTML += `
     

                    <td data-title="Giờ dạy">${classData.gio_day}</td>
                    <td data-title="Số học sinh">${tongHocSinh}</td>
                    <td data-title="Học phí">${classData.hoc_phi}</td>
                    <td data-title="">
                        <button class="btn btn-sm bg-primary-light" onclick="window.location.href = 'student-list.html?classKey=${classKey}'" data-id="' + ${classKey} + '"><i class=""></i> Danh sách</button>
                        <button class="btn btn-edit btn-sm bg-success-light" onclick="FillEditModal('${classKey}', '${classData.ten_lop}','${classData.loai}', '${escape(JSON.stringify(classData.ngay))}', '${classData.gio_day}', '${classData.hoc_phi}')" data-toggle="modal" data-dismiss="modal" data-target="#Edit_Class"><i class="fe fe-pencil"></i> Sửa</button>
                        <button class="btn btn-danger btn-sm" onclick="FillDeleteModal('${classKey}', '${classData.ten_lop}')" data-dismiss="modal" data-toggle="modal" data-target="#delete_modal">Xóa</button>
                    </td>
                `;
                        tableBody.appendChild(tr);
                        index++;
                    }
                }
            } else {
                // If there are no students, display a message
                tableBody.innerHTML = `<tr><td colspan="8">Không có học sinh nào trong lớp này.</td></tr>`;
            }
        });
    }
    window.onload = updateClassList();

    // Lắng nghe sự kiện click của nút "Thêm" và gọi hàm AddStudent
    document.addEventListener("DOMContentLoaded", function () {
        try {
            const addButton = document.getElementById("add-btn");
            addButton.addEventListener("click", function () { AddClass(); });
            const editButton = document.getElementById("edit-btn");
            editButton.addEventListener("click", function () { EditClass(); });
            const deleteButton = document.getElementById("delete-btn");
            deleteButton.addEventListener("click", function () { DeleteClass(); });

        } catch (error) {
            console.log(error);
        };


    });
    function AddClass() {
        // Lấy thông tin lớp học từ form
        var className = document.getElementById("className").value;
        var classType = document.getElementById("classType").value;
        var timeStudy = document.getElementById("timeStudy").value;
        if (className.length < 2 || classType.length < 2 || timeStudy.length < 2) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        var tuitionFee = document.getElementById("amountOfMoney").value;
        // Lấy ra tất cả các checkbox trong dropdown
        var checkboxes = document.querySelectorAll('#myDropdown input[type="checkbox"]');
        var selectedDays = [];

        // Lặp qua từng checkbox để kiểm tra xem ngày nào đã được chọn
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                // Nếu checkbox được chọn, thêm giá trị của checkbox vào mảng selectedDays
                selectedDays.push(checkbox.value);
            }
        });
        if (selectedDays.length === 0) {
            alert("Vui lòng chọn ngày học.");
            return;
        }
        // Tạo đối tượng chứa thông tin lớp học
        var classData = {
            "ten_lop": className,
            "loai": classType,
            "ngay": selectedDays,
            "gio_day": timeStudy,
            "hoc_phi": tuitionFee,
            "hoc_sinh": []
        };


        // Lấy danh sách học sinh hiện có để tính toán ID tiếp theo
        const classRef = ref(db, "class");
        get(classRef).then((snapshot) => {
            // Kiểm tra xem thông tin học sinh mới có trùng lặp với thông tin của các học sinh khác không
            const classRef = ref(db, "class");
            get(classRef).then((snapshot) => {
                const classList = snapshot.val();
                let isDuplicate = false;
                if (classList) {
                    // Lặp qua danh sách học sinh để kiểm tra trùng lặp
                    for (const classID in classList) {
                        const student = classList[classID];
                        if (student.ten_lop === className && student.loai === classType && student.gio_day === timeStudy && student.hoc_phi === tuitionFee && student.ngay === selectedDays) {
                            isDuplicate = true;
                            break;
                        }
                    }
                }

                if (isDuplicate) {
                    // Thông báo nếu thông tin học sinh mới trùng lặp với một học sinh khác
                    alert("Thông tin lớp học này đã tồn tại.");
                } else {
                    // Thêm học sinh mới vào Firebase nếu không trùng lặp
                    const classList = snapshot.val();
                    let nextclassID = 1; // Giả sử ID bắt đầu từ 1
                    if (classList) {
                        // Lặp qua danh sách học sinh để tìm ID lớn nhất
                        for (const classID in classList) {
                            nextclassID = Math.max(nextclassID, parseInt(classID) + 1);
                        }
                    }
                    // Thêm thông tin học sinh vào Firebase với ID đã tính toán được
                    set(ref(db, "class/" + nextclassID), classData)
                        .then(() => {
                            alert("Thêm lớp học thành công");
                            updateClassList(); // Cập nhật lại danh sách học sinh sau khi thêm
                        })
                        .catch((error) => {
                            alert("Lỗi khi thêm lớp học: " + error);
                        });
                }
            });
        });
        updateClassList();
    }
    function EditClass() {
        // Lấy thông tin lớp học từ form
        var classNameEdit = document.getElementById("classNameEdit").value;
        var classTypeEdit = document.getElementById("classTypeEdit").value;
        var timeStudyEdit = document.getElementById("timeStudyEdit").value;
        var tuitionFeeEdit = document.getElementById("amountOfMoneyEdit").value;
        var classKey = document.getElementById("classKeyHidden").value;
        if (!classKey) {
            alert("Vui lòng chọn ngày học.");
            window.location.href = "index.html";
        }
        if (className.length < 2 || classType.length < 2 || timeStudy.length < 2) {
            alert("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        // Lấy ra tất cả các checkbox trong dropdown
        var checkboxes = document.querySelectorAll('#myDropdown input[type="checkbox"]');
        var selectedDays = [];
        // Lặp qua từng checkbox để kiểm tra xem ngày nào đã được chọn
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                // Nếu checkbox được chọn, thêm giá trị của checkbox vào mảng selectedDays
                selectedDays.push(checkbox.value);
            }
        });
        if (selectedDays.length === 0) {
            alert("Vui lòng chọn lại ngày học.");
            return;
        }
        // Tạo đối tượng chứa thông tin lớp học
        var classData = {
            "ten_lop": classNameEdit,
            "loai": classTypeEdit,
            "ngay": selectedDays,
            "gio_day": timeStudyEdit,
            "hoc_phi": tuitionFeeEdit,
        };

        // Sửa thông tin học sinh trong Firebase
        update(ref(db, "class/" + classKey), classData)
            .then(() => {
                alert("Sửa học lớp học thành công");
                updateClassList();
            })
            .catch((error) => {
                alert("Lỗi khi sửa lớp học: " + error);
            });
        updateClassList();
    }
    function DeleteClass() {
        var classID = document.getElementById("classIDToDel").value;
        // Xoá thông tin lớp học trong Firebase
        remove(ref(db, "class/" + classID))
            .then(() => {
                alert("Xoá lớp học thành công");
                updateClassList();
            })
            .catch((error) => {
                alert("Lỗi khi xoá lớp học: " + error);
            });

    }

    window.onload = updateClassList();
}
// Trường hợp mặc định, không khớp với bất kỳ trang nào
else if (document.URL.includes("index.html")) {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // ██╗    ███╗   ██╗    ██████╗     ███████╗    ██╗  ██╗
    // ██║    ████╗  ██║    ██╔══██╗    ██╔════╝    ╚██╗██╔╝
    // ██║    ██╔██╗ ██║    ██║  ██║    █████╗       ╚███╔╝ 
    // ██║    ██║╚██╗██║    ██║  ██║    ██╔══╝       ██╔██╗ 
    // ██║    ██║ ╚████║    ██████╔╝    ███████╗    ██╔╝ ██╗
    // ╚═╝    ╚═╝  ╚═══╝    ╚═════╝     ╚══════╝    ╚═╝  ╚═╝

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Lắng nghe sự kiện click của nút "Thêm" và gọi hàm AddStudent
    document.addEventListener("DOMContentLoaded", function () {
        try {
            // const addButton = document.getElementById("add-btn");
            // addButton.addEventListener("click", function () { AddClass(); });
            // const editButton = document.getElementById("edit-btn");
            // editButton.addEventListener("click", function () { EditClass(); });
            // const deleteButton = document.getElementById("delete-btn");
            // deleteButton.addEventListener("click", function () { DeleteClass(); });
        } catch (error) {
            console.log(error);
        };

    });




}
else {
    console.log("Không thấy trang phù hợp.");
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// █████╗ ██╗   ██╗████████╗██╗  ██╗
// ██╔══██╗██║   ██║╚══██╔══╝██║  ██║
// ███████║██║   ██║   ██║   ███████║
// ██╔══██║██║   ██║   ██║   ██╔══██║
// ██║  ██║╚██████╔╝   ██║   ██║  ██║
// ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// chuyển tiền từ số sang chữ.
(function () {
    var default_numbers = ' hai ba bốn năm sáu bảy tám chín';
    var dict = {
        units: ('? một' + default_numbers).split(' '),
        tens: ('lẻ mười' + default_numbers).split(' '),
        hundreds: ('không một' + default_numbers).split(' '),
    }
    const tram = 'trăm';
    var digits = 'x nghìn triệu tỉ nghìn'.split(' ');

    function tenth(block_of_2) {
        var sl1 = dict.units[block_of_2[1]];
        var result = [dict.tens[block_of_2[0]]]
        if (block_of_2[0] > 0 && block_of_2[1] == 5)
            sl1 = 'lăm';
        if (block_of_2[0] > 1) {
            result.push('mươi');
            if (block_of_2[1] == 1)
                sl1 = 'mốt';
        }
        if (sl1 != '?') result.push(sl1);
        return result.join(' ');
    }

    function block_of_three(block) {

        switch (block.length) {
            case 1:
                return dict.units[block];

            case 2:
                return tenth(block);

            case 3:
                var result = [dict.hundreds[block[0]], tram];
                if (block.slice(1, 3) != '00') {
                    var sl12 = tenth(block.slice(1, 3));
                    result.push(sl12);
                }
                return result.join(' ');
        }
        return '';
    }

    function formatnumber(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    };

    function digit_counting(i, digit_counter) {
        var result = digits[i]

        return result
    }

    function to_vietnamese(input, currency) {
        var str = parseInt(input) + '';
        var index = str.length;
        if (index == 0 || str == 'NaN')
            return '';
        var i = 0;
        var arr = [];
        var result = []

        while (index >= 0) {
            arr.push(str.substring(index, Math.max(index - 3, 0)));
            index -= 3;
        }

        var digit_counter = 0;
        var digit;
        var adding;
        for (i = arr.length - 1; i >= 0; i--) {
            if (arr[i] == '000') {
                digit_counter += 1;
                if (i == 2 && digit_counter == 2) {
                    result.push(digit_counting(i + 1, digit_counter));
                }
            }
            else if (arr[i] != '') {
                digit_counter = 0
                result.push(block_of_three(arr[i]))
                digit = digit_counting(i, digit_counter);
                if (digit && digit != 'x') result.push(digit);
            }
        }
        if (currency)
            result.push(currency);
        // Chuyển chữ cái đầu thành chữ in hoa
            // Chỉ viết hoa chữ cái đầu của từng từ
        result = result.join(' ');
        // Chuyển chữ cái đầu của chuỗi thành chữ in hoa
        result = result.charAt(0).toUpperCase() + result.slice(1);
        return result
    }

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = to_vietnamese;
    }
    else if (typeof window !== undefined) {
        window.to_vietnamese = to_vietnamese;
    }
    return to_vietnamese
})();

function convertToVietnamese(input) {
    return to_vietnamese(input, 'đồng');
    
}
// console.log(convertToVietnamese(1500000));
