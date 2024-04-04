import { useMemo, useState } from "react";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ItemsTable = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "Id",
        enableEditing: false,
        size: 80,
        className: "hidden",
      },
      {
        accessorKey: "itemName",
        header: "Item Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.itemName,
          helperText: validationErrors?.itemName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              itemName: undefined,
            }),
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.description,
          helperText: validationErrors?.description,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
        },
      },
      {
        accessorKey: "itemPriority",
        header: "Item Priority",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.itemPriority,
          helperText: validationErrors?.itemPriority,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              itemPriority: undefined,
            }),
        },
      },
      {
        accessorKey: "perUnitCost",
        header: "Per Unit Cost",
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.perUnitCost,
          helperText: validationErrors?.perUnitCost,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              perUnitCost: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );

  const { mutateAsync: createItem, isPending: isCreatingItem } =
    useCreateItem();
  const {
    data: fetchedItems = [],
    isError: isLoadingItemsError,
    isFetching: isFetchingItems,
    isLoading: isLoadingItems,
  } = useGetItems();
  const { mutateAsync: updateItem, isPending: isUpdatingItem } =
    useUpdateItem();
  const { mutateAsync: deleteItem, isPending: isDeletingItem } =
    useDeleteItem();

  const handleCreateItem = async ({ values, table }) => {
    await createItem(values);
    table.setCreatingRow(null);
  };

  const handleSaveItem = async ({ values, table }) => {
    await updateItem(values);
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItem(row.original._id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedItems,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingItemsError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateItem,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveItem,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Add Item</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit Item</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => openDeleteConfirmModal(row)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Add Item
      </Button>
    ),
    state: {
      isLoading: isLoadingItems,
      isSaving: isCreatingItem || isUpdatingItem || isDeletingItem,
      showAlertBanner: isLoadingItemsError,
      showProgressBars: isFetchingItems,
    },
  });

  return <MaterialReactTable table={table} />;
};

function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item) => {
      const response = await fetch("http://localhost:3000/api/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...item, _id: undefined }),
      });
      return response.json();
    },
    onMutate: (newItemInfo) => {
      queryClient.setQueryData(["items"], (prevItems) => [
        ...prevItems,
        {
          ...newItemInfo,
        },
      ]);
    },
  });
}

function useGetItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/item");
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
}

function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item) => {
      const response = await fetch(
        `http://localhost:3000/api/item/${item._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...item, _id: undefined }),
        }
      );
      return response.json();
    },
    onMutate: (updatedItem) => {
      queryClient.setQueryData(["items"], (prevItems) =>
        prevItems?.map((prevItem) =>
          prevItem._id === updatedItem._id ? updatedItem : prevItem
        )
      );
    },
  });
}

function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemId) => {
      const response = await fetch(
        `http://localhost:3000/api/item/${itemId}`,
        {
          method: "DELETE",
        }
      );
      return response.json();
    },
    onMutate: (itemId) => {
      queryClient.setQueryData(["items"], (prevItems) =>
        prevItems?.filter((item) => item._id !== itemId)
      );
    },
  });
}

const queryClient = new QueryClient();

const ItemsTableWithProviders = () => (
  <QueryClientProvider client={queryClient}>
    <ItemsTable />
  </QueryClientProvider>
);

export default ItemsTable;

const validateRequired = (value) => !!value.length;

function validateItem(item) {
    return {
        itemName: !validateRequired(item.itemName)
            ? "Item Name is Required"
            : "",
        description: !validateRequired(item.description) ? "Description is Required" : "",
        itemPriority: !validateRequired(item.itemPriority) ? "Item Priority is Required" : "",
        perUnitCost: !validateRequired(item.perUnitCost) ? "Per Unit Cost is Required" : "",
    };
}
