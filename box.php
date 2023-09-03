<tr data-id="<?= $res['id'] ?>">
    <td><input type="checkbox" class="selectCheckbox rowCheckbox"></td>
    <td><?= $res['name'] . ' ' . $res['surnames'] ?></td>
    <td>
        <div class="status-indicator <?php echo ($res['status'] === 'true') ? 'bg-success' : 'bg-secondary'; ?>"></div>
    </td>
    <td><?= $res['role'] ?></td>
    <td>
        <button class="btn btn-sm btn-info editBtn"  data-id="<?= $res['id'] ?>"><i class="fas fa-edit"></i></button>

        <button class="btn btn-sm btn-danger deleteBtn" data-id="<?= $res['id'] ?>"><i class="fas fa-trash"></i>
        </button>
    </td>
</tr>