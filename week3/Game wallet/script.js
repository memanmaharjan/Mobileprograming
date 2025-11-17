$(document).ready(function () {

    let total = 0;

    $("#addBtn").click(function () {
        $("#form").toggle();
    });

    // Save purchase
    $("#saveBtn").click(function () {

        let game = $("#game").val();
        let item = $("#item").val();
        let amount = Number($("#amount").val());

        if (game === "" || item === "" || amount === 0) {
            alert("Please fill all fields.");
            return;
        }

        total += amount;
        $("#totalText").text("Total Spent: Rs " + total);

        $("#history").append(
            `<li class="purchaseItem">${game} - ${item} (Rs ${amount})</li>`
        );

        $("#totalText").addClass("highlight");
        setTimeout(() => {
            $("#totalText").removeClass("highlight");
        }, 1200);

        $("#game").val("");
        $("#item").val("");
        $("#amount").val("");
        $("#form").hide();
    });

    $(document).on("click", ".purchaseItem", function () {
        alert("Item: " + $(this).text());
    });

    $("#hamburger").click(function () {
        $("#menu").toggleClass("active");
    });

    $(".menu a").click(function () {
        $("#menu").removeClass("active");
    });

});
