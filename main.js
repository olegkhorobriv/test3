$(document).ready(function () {
    $("#statusToggle").change(function () {
        if (this.checked) {
            $(".toggle-indicator").addClass("active");
        } else {
            $(".toggle-indicator").removeClass("active");
        }
    });
    $(document).on("click", "#selectAll", function ()  {
        var isChecked = this.checked;
        $(".selectCheckbox").prop("checked", isChecked);
        $(".rowCheckbox").prop("checked", isChecked);
    });

    $(document).on("click", ".selectCheckbox", function ()  {
        // Перевірте, чи ні один чекбокс не відзначено, і зніміть галочку з загального чекбокса "Вибрати всі"
        if ($(".selectCheckbox:checked").length === 0) {
            $("#selectAll").prop("checked", false);
        } else if ($(".selectCheckbox:checked").length === $(".selectCheckbox").length) {
            $("#selectAll").prop("checked", true);
        }
    });

    $(document).on("click", "#addBtnTop, #addBtnBottom, .editBtn", function () {

        var fullName = $(this).closest("tr").find("td:eq(1)").text();
        var status = $(this).closest("tr").find(".toggle-indicator").hasClass("active");
        var role = $(this).closest("tr").find("td:eq(3)").text();
        var userId = $(this).data("id");

        var nameParts = fullName.split(" ");
        var firstName = nameParts[0];
        var lastName = nameParts.slice(1).join(" ");

        $("#firstName").val(firstName);
        $("#lastName").val(lastName);
        $("#statusToggle").prop("checked", status);
        $("#role").val(role);
        $(".hiddenInput").val(userId);

        $("#addEditModal").modal("show");
    });
    $("#okBtnTop").click(function () {

        if ($("#actionSelectTop").val() === "") {
            $("#warningModal").modal("show");
        } else {

            var selectedAction = $("#actionSelectTop").val();


            if (selectedAction === "setActive") {
                var selectedIds = [];

                $(".rowCheckbox:checked").each(function () {
                    var row = $(this).closest("tr");
                    var id = row.data("id");
                    selectedIds.push(id);
                });

                $.ajax({
                    url: "active.php",
                    method: "POST",
                    data: {
                        selectedIds: selectedIds
                    },
                    success: function (response) {

                        updateTable();
                    }
                });
                $("#selectAll").prop("checked", false);
            } else if (selectedAction === "setNotActive") {


                var selectedIds = [];

                $(".rowCheckbox:checked").each(function () {
                    var row = $(this).closest("tr");
                    var id = row.data("id");
                    selectedIds.push(id);
                });

                $.ajax({
                    url: "not_active.php",
                    method: "POST",
                    data: {
                        selectedIds: selectedIds
                    },
                    success: function (response) {

                        updateTable();
                    }
                });
                $("#selectAll").prop("checked", false);
            } else if (selectedAction === "delete") {
                $("#confirmDeleteModal").modal("show");
                var selectedIds = [];

                $(".rowCheckbox:checked").each(function () {
                    var row = $(this).closest("tr");
                    var id = row.data("id");
                    selectedIds.push(id);
                });

                $("#deleteConfirmedBtn").off("click").on("click", function () {

                    $.ajax({
                        url: "deletechecket.php",
                        method: "POST",
                        data: {
                            selectedIds: selectedIds
                        },
                        success: function (response) {

                            updateTable();
                        }
                    });

                    $("#confirmDeleteModal").modal("hide");
                });
                $("#selectAll").prop("checked", false);
            }
        }
    });
    $("#okBtnBottom").click(function () {
        if ($("#actionSelectBottom").val() === "") {
            $("#warningModal").modal("show");
        } else {

            var selectedActionBottom = $("#actionSelectBottom").val();


            if (selectedActionBottom === "setActive") {
                var selectedIds = [];

                $(".rowCheckbox:checked").each(function () {
                    var row = $(this).closest("tr");
                    var id = row.data("id");
                    selectedIds.push(id);
                });

                $.ajax({
                    url: "active.php",
                    method: "POST",
                    data: {
                        selectedIds: selectedIds
                    },
                    success: function (response) {

                        updateTable();
                    }
                });

                $("#selectAll").prop("checked", false);
            } else if (selectedActionBottom === "setNotActive") {


                var selectedIds = [];

                $(".rowCheckbox:checked").each(function () {
                    var row = $(this).closest("tr");
                    var id = row.data("id");
                    selectedIds.push(id);
                });

                    $.ajax({
                        url: "not_active.php",
                        method: "POST",
                        data: {
                            selectedIds: selectedIds
                        },
                        success: function (response) {

                            updateTable();
                        }
                    });
                $("#selectAll").prop("checked", false);
            } else if (selectedActionBottom === "delete") {
                $("#confirmDeleteModal").modal("show");
                var selectedIds = [];

                $(".rowCheckbox:checked").each(function () {
                    var row = $(this).closest("tr");
                    var id = row.data("id");
                    selectedIds.push(id);
                });

                $("#deleteConfirmedBtn").off("click").on("click", function () {

                    $.ajax({
                        url: "deletechecket.php",
                        method: "POST",
                        data: {
                            selectedIds: selectedIds
                        },
                        success: function (response) {

                            updateTable();
                        }
                    });

                    $("#confirmDeleteModal").modal("hide");
                });
                $("#selectAll").prop("checked", false);
            }

        }
    });
    function updateTable() {
        $.ajax({
            url: 'get_user.php',
            method: 'GET',
            dataType: 'html',
            success: function (response) {
                $('#data-table').html(response);
            }
        });
    }
    updateTable();
    $(document).on("click", ".deleteBtn", function () {
        var userId = $(this).data("id");
        $("#confirmDeleteModal").modal("show");

        $("#deleteConfirmedBtn").off("click").on("click", function () {

            $.ajax({
                url: "delete.php",
                method: "POST",
                data: {
                    userId: userId
                },
                success: function (response) {
                    updateTable();

                }
            });


            $("#confirmDeleteModal").modal("hide");
        });
    });
    $("#saveBtn").click(function () {
        var userId = $(".hiddenInput").val();
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var status = $("#statusToggle").prop("checked");
        var role = $("#role").val();

        // Перевірка на пустоту полів
        if (firstName === '' || lastName === '' || role === '') {
            alert("Будь ласка, заповніть всі поля.");
            return; // Вихід з функції, якщо поля порожні
        }
        var nameSurnamePattern = /^[A-Za-zА-Яа-яЁёІі0-9\s]+$/;
        if (!nameSurnamePattern.test(firstName) || !nameSurnamePattern.test(lastName)) {

            alert("Введіть коректне ім'я та прізвище");
            return;
        }

        if (userId) {

            $.ajax({
                url: "update.php",
                method: "POST",
                data: {
                    userId: userId,
                    firstName: firstName,
                    lastName: lastName,
                    status: status,
                    role: role
                },
                success: function (response) {

                    $('#data-table').html(response);
                    $("#addEditModal").modal("hide");
                }
            });
        } else {

            $.ajax({
                url: "user.php",
                method: "POST",
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    status: status,
                    role: role
                },
                success: function (response) {

                    updateTable();
                    $("#addEditModal").modal("hide");
                }
            });
        }
    });
});






