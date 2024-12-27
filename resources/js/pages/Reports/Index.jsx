import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Paginations from '../../components/common/Paginations';
import CalculateAverageModal from '../../components/features/dashboard/Modals/CalculateAverageModal';
import GenerateReportModal from '../../components/features/dashboard/Modals/GenerateReportModal';
import ResultAverageModal from '../../components/features/dashboard/Modals/ResultAverageModal';
import Tables from '../../components/features/dashboard/Tables/Tables';
import { Button } from '../../components/ui/button';
import { toast } from '../../hooks/use-toast';
import DashboardLayout from '../../layouts/DashboardLayout';

const Index = () => {
  const { reports } = usePage().props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalculateModalOpen, setIsCalculateModalOpen] =
    useState(false);
  const [isResultModalOpen, setIsResultModalOpen] =
    useState(false);
  const [averageResults, setAverageResults] =
    useState(null);

  const columns = [
    { title: '', field: 'id' },
    { title: 'Year', field: 'year' },
    { title: 'Month', field: 'month' },
    { title: 'Total Income', field: 'total_income' },
    { title: 'Total Expense', field: 'total_expense' },
  ];

  const handlePageChange = (page) => {
    router.visit(route('reports.index', { page }), {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCalculateAverage = async (year) => {
    try {
      const response = await axios.post(
        route('reports.avg'),
        { year }
      );
      setAverageResults(response.data);
      setIsCalculateModalOpen(false);
      setIsResultModalOpen(true);
      toast({
        title: 'Successfully Get Averages Summary',
        description:
          'The summary averages have been calculated successfully.',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error, Failed Get Averages Summary',
        description:
          'Something went wrong trying to get the summary averages, please try again',
        variant: 'destructive',
      });
    }
  };

  return (
    <DashboardLayout>
      <Head title="Reports" />
      <div className="relative flex w-full flex-col items-center justify-center space-y-2 overflow-hidden px-4 py-2 md:px-6 md:py-4">
        <div className="mb-4 flex w-full flex-row items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">
              Showing {reports.from || 0} to{' '}
              {reports.to || 0} of {reports.total} reports
            </p>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="md:text-md md:font-semibold"
              onClick={openModal}
            >
              Generate Report
            </Button>
          </div>
        </div>
        <Tables
          columns={columns}
          data={reports.data}
          indexData={
            (reports.current_page - 1) * reports.per_page
          }
          onCalculateAverage={() =>
            setIsCalculateModalOpen(true)
          }
        />
        <Paginations
          currentPage={reports.current_page}
          totalPages={reports.last_page}
          onPageChange={handlePageChange}
        />
      </div>
      <GenerateReportModal
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <CalculateAverageModal
        isOpen={isCalculateModalOpen}
        onClose={() => setIsCalculateModalOpen(false)}
        onCalculate={handleCalculateAverage}
      />
      <ResultAverageModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        results={averageResults}
      />
    </DashboardLayout>
  );
};

export default Index;
